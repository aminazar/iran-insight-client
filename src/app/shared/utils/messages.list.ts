/**
 * Errors
 */
interface IError {
  error: Error;
  code: number;
  friendlyMessage: string
  friendlyMessage_fa: string
}

let illegalTypeName: IError = {
  friendlyMessage_fa: '',
  friendlyMessage: 'illegal type name is specified',
  error: new Error('illegal type name is specified'),
  code: 404
};

let noType: IError = {

  friendlyMessage_fa: '',
  friendlyMessage: 'type with this id is not found',
  error: new Error('No type found'),
  code: 404
};

/**
 * Messages
 */
interface IMessage {
  message: string;
  message_fa: string;
}


let typeInsertSuccessful: IMessage = {
  message: 'type inserted successfully',
  message_fa: ''
};
let typeUpdateSuccessful: IMessage = {
  message: 'type updated successfully',
  message_fa: ''
};

export {

  illegalTypeName,
  noType,
  typeInsertSuccessful,
  typeUpdateSuccessful
};



