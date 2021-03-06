import { ValidationMessage } from "../models/validationMessage";
import { Mediator } from "../services/mediator";
import { Query } from "../models/query";
import { QueryResponse } from "../models/queryResponse";
import { CommandResponse } from "../models/commandResponse";
import { Command } from "../models/command";
import { EventEmitter, Output } from "@angular/core";
import { Subject } from "rxjs/Subject";
import MessageType from "../models/messageType";
export abstract class BasePage {

    @Output() public messagesReceived = new EventEmitter();
    @Output() public receivedMessages: Subject<ValidationMessage[]> = new Subject();

    constructor(public mediator: Mediator, public componentName: string, public pageHeader: string, public pageSubHeader: string) {
    }

    public showSuccess() {
        this.showInfo("Your Changes were saved");
    }

    public showInfo(message: string) {
        this.messagesReceived.emit([new ValidationMessage(MessageType.Info, "", message)]);
    }

    public showWarning(message: string) {
        this.messagesReceived.emit([new ValidationMessage(MessageType.Warning, "", message)]);
    }

    public showError(message: string) {
        this.messagesReceived.emit([new ValidationMessage(MessageType.Error, "", message)]);
    }

    public showException(message: string) {
        this.messagesReceived.emit([new ValidationMessage(MessageType.Exception, "", message)]);
    }

    public query<U>(query: Query<U>): Promise<QueryResponse<U>> {
        return this.mediator.query(query)
            .then((res) => {
                const result = res as QueryResponse<U>;
                this.messagesReceived.emit(result.ValidationMessages);
                return res as QueryResponse<U>;
            }, (res) => {
                const result = res as QueryResponse<U>;
                this.messagesReceived.emit(result.ValidationMessages);
                return res as QueryResponse<U>;
            });
    }

    public command<U>(command: Command<U>): Promise<CommandResponse<U>> {
        return this.mediator.command(command)
            .then((res) => {
                const result = res as QueryResponse<U>;
                this.messagesReceived.emit(result.ValidationMessages);
                return res as QueryResponse<U>;
            }, (res) => {
                const result = res as QueryResponse<U>;
                this.messagesReceived.emit(result.ValidationMessages);
                return res as QueryResponse<U>;
            });
    }
}
