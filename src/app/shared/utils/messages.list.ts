/**
 * Errors
 */
interface IError {
  error: Error;
  code: number;
  friendlyMessage: string;
  friendlyMessage_fa: string;
}

const errors: IError[] = [
  {
    friendlyMessage_fa: '',
    friendlyMessage: 'illegal type name is specified',
    error: new Error('illegal type name is specified'),
    code: 404
  }, {
    friendlyMessage_fa: '',
    friendlyMessage: 'Please specify the joiner name',
    error: new Error('null value in column "pid2" violates not-null constraint'),
    code: 500
  }, {
    friendlyMessage_fa: 'کسب و کاری با این شناسه وجود ندارد',
    friendlyMessage: 'There is no business with this id',
    error: new Error('insert or update on table "association" violates foreign key constraint "association_bid_fkey"'),
    code: 500,
  }, {
    friendlyMessage_fa: '',
    friendlyMessage: '',
    error: new Error(`Cannot read property 'pid' of undefined`),
    code: 500,
  }
];


/**
 * Messages
 */
interface IMessage {
  message: string;
  message_fa: string;
}


const typeInsertSuccessful: IMessage = {
  message: 'type inserted successfully',
  message_fa: ''
};
const typeUpdateSuccessful: IMessage = {
  message: 'type updated successfully',
  message_fa: ''
};

export {
  typeInsertSuccessful,
  typeUpdateSuccessful,
  errors
};



