// menu 数据 类型
export interface RequestMenulist {
	alwaysShow: boolean;
	children: RequestChild[];
	component: string;
	hidden: boolean;
	meta: RequestMeta;
	name: string;
	path: string;
	redirect: string;
	[property: string]: any;
}

export interface RequestChild {
	alwaysShow?: boolean;
	children?: ChildChild[];
	component: string;
	hidden: boolean;
	meta: FluffyMeta;
	name: string;
	path: string;
	redirect?: string;
	[property: string]: any;
}

export interface ChildChild {
	component: string;
	hidden: boolean;
	meta: PurpleMeta;
	name: string;
	path: string;
	[property: string]: any;
}

export interface PurpleMeta {
	icon: string;
	noCache: boolean;
	title: string;
	[property: string]: any;
}

export interface FluffyMeta {
	icon: string;
	noCache: boolean;
	title: string;
	[property: string]: any;
}

export interface RequestMeta {
	icon: string;
	noCache: boolean;
	title: string;
	[property: string]: any;
}
