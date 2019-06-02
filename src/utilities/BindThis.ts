import React from "react";

/**
 * Decorator utility to bind "this" to methods in React components, without polluting the constructor.
 */
export function BindThis(): (target: React.Component, key: string, descriptor: PropertyDescriptor) => {} {
    return (_: React.Component, key: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
        if (!descriptor || typeof descriptor.value !== "function") {
            throw new TypeError(`Can only bind this on methods! ${key} is not a method.`);
        }

        return {
            configurable: true,
            get(this) {
                const bound = descriptor.value!.bind(this);
                Object.defineProperty(this, key, {
                    configurable: true,
                    value: bound,
                    writable: true,
                });
                return bound;
            },
        };
    };
}
