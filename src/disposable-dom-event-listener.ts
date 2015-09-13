import { Disposable } from 'event-kit';

/**
 * Add an event listener to a DOM node.
 * 
 * @return An object that upon being disposed will remove the event listener from the node it was
 *         originally added to. 
 */
export default function add(node: HTMLElement, eventName: string, callback: EventListener): Disposable {
	node.addEventListener(eventName, callback);
    return new Disposable(node.removeEventListener.bind(node, eventName, callback));
}
