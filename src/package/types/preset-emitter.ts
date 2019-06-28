export type DomEmitter = {
	addEventListener(
		identifier: any,
		listener: (...args: any[]) => any,
		...extras: any[]
	): any;
	
	removeEventListener(
		identifier: any,
		listener: (...args: any[]) => any,
		...extras: any[]
	): any;
}

export type NodeEmitter = {
	addListener(
		identifier: any,
		listener: (...args: any[]) => any,
		...extras: any[]
	): any;
	
	removeListener(
		identifier: any,
		listener: (...args: any[]) => any,
		...extras: any[]
	): any;
}

export type JqueryEmitter = {
	on(
		identifier: any,
		listener: (...args: any[]) => any,
		...extras: any[]
	): any;
	
	off(
		identifier: any,
		listener: (...args: any[]) => any,
		...extras: any[]
	): any;
}