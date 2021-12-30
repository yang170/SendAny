<?php
namespace GraphQL\Language\AST;

class OperationTypeDefinition extends Node
{
    /**
     * @var string
     */
    public $kind = Node::OPERATION_TYPE_DEFINITION;

    /**
     * One of 'query' | 'mutation' | 'subscription'
     *
     * @var string
     */
    public $operation;

    /**
     * @var NamedType
     */
    public $type;
}
