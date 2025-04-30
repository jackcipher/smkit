export namespace svc {
	
	export class RespUserMe {
	    id: number;
	    name: string;
	    email: string;
	    avatar: string;
	    status: number;
	    teamRole: string;
	    mobile: string;
	    requiresIdentityVerification: boolean;
	
	    static createFrom(source: any = {}) {
	        return new RespUserMe(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.email = source["email"];
	        this.avatar = source["avatar"];
	        this.status = source["status"];
	        this.teamRole = source["teamRole"];
	        this.mobile = source["mobile"];
	        this.requiresIdentityVerification = source["requiresIdentityVerification"];
	    }
	}

}

