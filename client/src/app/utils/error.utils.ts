export class ErrorUtils {

  public static readonly INTERNAL_ERROR = 'internalError';
  public static readonly ACCOUNT_DOES_NOT_EXIST = 'account.doesNotExist';
  public static readonly ACCOUNT_AUTH_WRONG_PASSWORD = 'account.auth.wrongPassword';
  public static readonly SLACK_TOKEN_REVOKED = 'token_revoked';

  public static readonly CONTEXT_AUTHENTICATION = 'authentication';

  public static setup() {
    const authContext = {};
    authContext[ErrorUtils.ACCOUNT_DOES_NOT_EXIST] = 'Não existe uma conta com este email';
    authContext[ErrorUtils.ACCOUNT_AUTH_WRONG_PASSWORD] = 'Senha inválida';

    ErrorUtils.MESSAGES[ErrorUtils.CONTEXT_AUTHENTICATION] = authContext;
  }

  public static getErrorMessage(context: string, err: any) {
    const messages = ErrorUtils.MESSAGES[context];
    return messages && messages[err.code] ? messages[err.code] : ErrorUtils.DEFAULT_ERROR_MESSAGE;
  }

  private static readonly DEFAULT_ERROR_MESSAGE = 'Não foi possível completar a ação, por favor tente novamente mais tarde.';
  private static readonly MESSAGES = {};

  private constructor() {

  }
}
ErrorUtils.setup();
