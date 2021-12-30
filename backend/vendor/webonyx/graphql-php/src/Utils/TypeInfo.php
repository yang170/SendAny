<?php
namespace GraphQL\Utils;

use GraphQL\Language\AST\Field;
use GraphQL\Language\AST\ListType;
use GraphQL\Language\AST\Name;
use GraphQL\Language\AST\NamedType;
use GraphQL\Language\AST\Node;
use GraphQL\Language\AST\NonNullType;
use GraphQL\Schema;
use GraphQL\Type\Definition\CompositeType;
use GraphQL\Type\Definition\Directive;
use GraphQL\Type\Definition\FieldArgument;
use GraphQL\Type\Definition\FieldDefinition;
use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\InputType;
use GraphQL\Type\Definition\InterfaceType;
use GraphQL\Type\Definition\ListOfType;
use GraphQL\Type\Definition\NonNull;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;
use GraphQL\Type\Definition\UnionType;
use GraphQL\Type\Introspection;
use GraphQL\Utils;

class TypeInfo
{
    /**
     * Provided two types, return true if the types are equal (invariant).
     */
    public static function isEqualType(Type $typeA, Type $typeB)
    {
        // Equivalent types are equal.
        if ($typeA === $typeB) {
            return true;
        }

        // If either type is non-null, the other must also be non-null.
        if ($typeA instanceof NonNull && $typeB instanceof NonNull) {
            return self::isEqualType($typeA->getWrappedType(), $typeB->getWrappedType());
        }

        // If either type is a list, the other must also be a list.
        if ($typeA instanceof ListOfType && $typeB instanceof ListOfType) {
            return self::isEqualType($typeA->getWrappedType(), $typeB->getWrappedType());
        }

        // Otherwise the types are not equal.
        return false;
    }

    /**
     * Provided a type and a super type, return true if the first type is either
     * equal or a subset of the second super type (covariant).
     */
    static function isTypeSubTypeOf(Schema $schema, Type $maybeSubType, Type $superType)
    {
        // Equivalent type is a valid subtype
        if ($maybeSubType === $superType) {
            return true;
        }

        // If superType is non-null, maybeSubType must also be nullable.
        if ($superType instanceof NonNull) {
            if ($maybeSubType instanceof NonNull) {
                return self::isTypeSubTypeOf($schema, $maybeSubType->getWrappedType(), $superType->getWrappedType());
            }
            return false;
        } else if ($maybeSubType instanceof NonNull) {
            // If superType is nullable, maybeSubType may be non-null.
            return self::isTypeSubTypeOf($schema, $maybeSubType->getWrappedType(), $superType);
        }

        // If superType type is a list, maybeSubType type must also be a list.
        if ($superType instanceof ListOfType) {
            if ($maybeSubType instanceof ListOfType) {
                return self::isTypeSubTypeOf($schema, $maybeSubType->getWrappedType(), $superType->getWrappedType());
            }
            return false;
        } else if ($maybeSubType instanceof ListOfType) {
            // If superType is not a list, maybeSubType must also be not a list.
            return false;
        }

        // If superType type is an abstract type, maybeSubType type may be a currently
        // possible object type.
        if (Type::isAbstractType($superType) && $maybeSubType instanceof ObjectType && $schema->isPossibleType($superType, $maybeSubType)) {
            return true;
        }

        // Otherwise, the child type is not a valid subtype of the parent type.
        return false;
    }


    /**
     * Provided two composite types, determine if they "overlap". Two composite
     * types overlap when the Sets of possible concrete types for each intersect.
     *
     * This is often used to determine if a fragment of a given type could possibly
     * be visited in a context of another type.
     *
     * This function is commutative.
     */
    static function doTypesOverlap(Schema $schema, CompositeType $typeA, CompositeType $typeB)
    {
        // Equivalent types overlap
        if ($typeA === $typeB) {
            return true;
        }

        if ($typeA instanceof InterfaceType || $typeA instanceof UnionType) {
            if ($typeB instanceof InterfaceType || $typeB instanceof UnionType) {
                // If both types are abstract, then determine if there is any intersection
                // between possible concrete types of each.
                foreach ($schema->getPossibleTypes($typeA) as $type) {
                    if ($schema->isPossibleType($typeB, $type)) {
                        return true;
                    }
                }
                return false;
            }

            // Determine if the latter type is a possible concrete type of the former.
            return $schema->isPossibleType($typeA, $typeB);
        }

        if ($typeB instanceof InterfaceType || $typeB instanceof UnionType) {
            // Determine if the former type is a possible concrete type of the latter.
            return $schema->isPossibleType($typeB, $typeA);
        }

        // Otherwise the types do not overlap.
        return false;
    }


    /**
     * @param Schema $schema
     * @param $inputTypeAst
     * @return ListOfType|NonNull|Name
     * @throws \Exception
     */
    public static function typeFromAST(Schema $schema, $inputTypeAst)
    {
        if ($inputTypeAst instanceof ListType) {
            $innerType = self::typeFromAST($schema, $inputTypeAst->type);
            return $innerType ? new ListOfType($innerType) : null;
        }
        if ($inputTypeAst instanceof NonNullType) {
            $innerType = self::typeFromAST($schema, $inputTypeAst->type);
            return $innerType ? new NonNull($innerType) : null;
        }

        Utils::invariant($inputTypeAst && $inputTypeAst->kind === Node::NAMED_TYPE, 'Must be a named type');
        return $schema->getType($inputTypeAst->name->value);
    }

    /**
     * Not exactly the same as the executor's definition of getFieldDef, in this
     * statically evaluated environment we do not always have an Object type,
     * and need to handle Interface and Union types.
     *
     * @return FieldDefinition
     */
    static private function _getFieldDef(Schema $schema, Type $parentType, Field $fieldAST)
    {
        $name = $fieldAST->name->value;
        $schemaMeta = Introspection::schemaMetaFieldDef();
        if ($name === $schemaMeta->name && $schema->getQueryType() === $parentType) {
            return $schemaMeta;
        }

        $typeMeta = Introspection::typeMetaFieldDef();
        if ($name === $typeMeta->name && $schema->getQueryType() === $parentType) {
            return $typeMeta;
        }
        $typeNameMeta = Introspection::typeNameMetaFieldDef();
        if ($name === $typeNameMeta->name &&
            ($parentType instanceof ObjectType ||
            $parentType instanceof InterfaceType ||
            $parentType instanceof UnionType)
        ) {
            return $typeNameMeta;
        }
        if ($parentType instanceof ObjectType ||
            $parentType instanceof InterfaceType) {
            $fields = $parentType->getFields();
            return isset($fields[$name]) ? $fields[$name] : null;
        }
        return null;
    }


    /**
     * @var Schema
     */
    private $_schema;

    /**
     * @var \SplStack<OutputType>
     */
    private $_typeStack;

    /**
     * @var \SplStack<CompositeType>
     */
    private $_parentTypeStack;

    /**
     * @var \SplStack<InputType>
     */
    private $_inputTypeStack;

    /**
     * @var \SplStack<FieldDefinition>
     */
    private $_fieldDefStack;

    /**
     * @var Directive
     */
    private $_directive;

    /**
     * @var FieldArgument
     */
    private $_argument;

    public function __construct(Schema $schema)
    {
        $this->_schema = $schema;
        $this->_typeStack = [];
        $this->_parentTypeStack = [];
        $this->_inputTypeStack = [];
        $this->_fieldDefStack = [];
    }

    /**
     * @return Type
     */
    function getType()
    {
        if (!empty($this->_typeStack)) {
            return $this->_typeStack[count($this->_typeStack) - 1];
        }
        return null;
    }

    /**
     * @return Type
     */
    function getParentType()
    {
        if (!empty($this->_parentTypeStack)) {
            return $this->_parentTypeStack[count($this->_parentTypeStack) - 1];
        }
        return null;
    }

    /**
     * @return InputType
     */
    function getInputType()
    {
        if (!empty($this->_inputTypeStack)) {
            return $this->_inputTypeStack[count($this->_inputTypeStack) - 1];
        }
        return null;
    }

    /**
     * @return FieldDefinition
     */
    function getFieldDef()
    {
        if (!empty($this->_fieldDefStack)) {
            return $this->_fieldDefStack[count($this->_fieldDefStack) - 1];
        }
        return null;
    }

    /**
     * @return Directive|null
     */
    function getDirective()
    {
        return $this->_directive;
    }

    /**
     * @return FieldArgument|null
     */
    function getArgument()
    {
        return $this->_argument;
    }

    function enter(Node $node)
    {
        $schema = $this->_schema;

        switch ($node->kind) {
            case Node::SELECTION_SET:
                $namedType = Type::getNamedType($this->getType());
                $compositeType = null;
                if (Type::isCompositeType($namedType)) {
                    // isCompositeType is a type refining predicate, so this is safe.
                    $compositeType = $namedType;
                }
                $this->_parentTypeStack[] = $compositeType; // push
                break;

            case Node::FIELD:
                $parentType = $this->getParentType();
                $fieldDef = null;
                if ($parentType) {
                    $fieldDef = self::_getFieldDef($schema, $parentType, $node);
                }
                $this->_fieldDefStack[] = $fieldDef; // push
                $this->_typeStack[] = $fieldDef ? $fieldDef->getType() : null; // push
                break;

            case Node::DIRECTIVE:
                $this->_directive = $schema->getDirective($node->name->value);
                break;

            case Node::OPERATION_DEFINITION:
                $type = null;
                if ($node->operation === 'query') {
                    $type = $schema->getQueryType();
                } else if ($node->operation === 'mutation') {
                    $type = $schema->getMutationType();
                } else if ($node->operation === 'subscription') {
                    $type = $schema->getSubscriptionType();
                }
                $this->_typeStack[] = $type; // push
                break;

            case Node::INLINE_FRAGMENT:
            case Node::FRAGMENT_DEFINITION:
                $typeConditionAST = $node->typeCondition;
                $outputType = $typeConditionAST ? self::typeFromAST($schema, $typeConditionAST) : $this->getType();
                $this->_typeStack[] = $outputType; // push
                break;

            case Node::VARIABLE_DEFINITION:
                $inputType = self::typeFromAST($schema, $node->type);
                $this->_inputTypeStack[] = $inputType; // push
                break;

            case Node::ARGUMENT:
                $fieldOrDirective = $this->getDirective() ?: $this->getFieldDef();
                $argDef = $argType = null;
                if ($fieldOrDirective) {
                    $argDef = Utils::find($fieldOrDirective->args, function($arg) use ($node) {return $arg->name === $node->name->value;});
                    if ($argDef) {
                        $argType = $argDef->getType();
                    }
                }
                $this->_argument = $argDef;
                $this->_inputTypeStack[] = $argType; // push
                break;

            case Node::LST:
                $listType = Type::getNullableType($this->getInputType());
                $this->_inputTypeStack[] = ($listType instanceof ListOfType ? $listType->getWrappedType() : null); // push
                break;

            case Node::OBJECT_FIELD:
                $objectType = Type::getNamedType($this->getInputType());
                $fieldType = null;
                if ($objectType instanceof InputObjectType) {
                    $tmp = $objectType->getFields();
                    $inputField = isset($tmp[$node->name->value]) ? $tmp[$node->name->value] : null;
                    $fieldType = $inputField ? $inputField->getType() : null;
                }
                $this->_inputTypeStack[] = $fieldType;
            break;
        }
    }

    function leave(Node $node)
    {
        switch ($node->kind) {
            case Node::SELECTION_SET:
                array_pop($this->_parentTypeStack);
                break;

            case Node::FIELD:
                array_pop($this->_fieldDefStack);
                array_pop($this->_typeStack);
                break;

            case Node::DIRECTIVE:
                $this->_directive = null;
                break;

            case Node::OPERATION_DEFINITION:
            case Node::INLINE_FRAGMENT:
            case Node::FRAGMENT_DEFINITION:
                array_pop($this->_typeStack);
                break;
            case Node::VARIABLE_DEFINITION:
                array_pop($this->_inputTypeStack);
                break;
            case Node::ARGUMENT:
                $this->_argument = null;
                array_pop($this->_inputTypeStack);
                break;
            case Node::LST:
            case Node::OBJECT_FIELD:
                array_pop($this->_inputTypeStack);
                break;
        }
    }
}
