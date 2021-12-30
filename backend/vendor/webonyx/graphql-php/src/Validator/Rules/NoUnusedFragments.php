<?php
namespace GraphQL\Validator\Rules;


use GraphQL\Error;
use GraphQL\Language\AST\FragmentDefinition;
use GraphQL\Language\AST\FragmentSpread;
use GraphQL\Language\AST\Node;
use GraphQL\Language\Visitor;
use GraphQL\Validator\Messages;
use GraphQL\Validator\ValidationContext;

class NoUnusedFragments
{
    static function unusedFragMessage($fragName)
    {
        return "Fragment \"$fragName\" is never used.";
    }

    public $operationDefs;

    public $fragmentDefs;

    public function __invoke(ValidationContext $context)
    {
        $this->operationDefs = [];
        $this->fragmentDefs = [];

        return [
            Node::OPERATION_DEFINITION => function($node) {
                $this->operationDefs[] = $node;
                return Visitor::skipNode();
            },
            Node::FRAGMENT_DEFINITION => function(FragmentDefinition $def) {
                $this->fragmentDefs[] = $def;
                return Visitor::skipNode();
            },
            Node::DOCUMENT => [
                'leave' => function() use ($context) {
                    $fragmentNameUsed = [];

                    foreach ($this->operationDefs as $operation) {
                        foreach ($context->getRecursivelyReferencedFragments($operation) as $fragment) {
                            $fragmentNameUsed[$fragment->name->value] = true;
                        }
                    }

                    foreach ($this->fragmentDefs as $fragmentDef) {
                        $fragName = $fragmentDef->name->value;
                        if (empty($fragmentNameUsed[$fragName])) {
                            $context->reportError(new Error(
                                self::unusedFragMessage($fragName),
                                [ $fragmentDef ]
                            ));
                        }
                    }
                }
            ]
        ];
    }
}
