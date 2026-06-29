export class Agent {

    constructor(config){

        this.id=config.id;
        this.name=config.name;
        this.role=config.role;
        this.department=config.department;
        this.manager=config.manager;

        this.status="ONLINE";

        this.currentTask=null;

        this.inbox=[];

        this.outbox=[];

        this.memory=[];

        this.performance={

            completed:0,

            pending:0

        };

    }

}