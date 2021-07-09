export enum MessageType {
  SOURCE_LINE = 'SOURCE_LINE',
  SYNTAX_ERROR = 'SYNTAX_ERROR',
  PARSER_SUMMARY = 'PARSER_SUMMARY',
  INTERPRETER_SUMMARY = 'INTERPRETER_SUMMARY',
  COMPILER_SUMMARY = 'COMPILER_SUMMARY',
  TOKEN = 'TOKEN',
  ASSIGN = 'ASSIGN',
  FETCH = 'FETCH',
  BREAKPOINT = 'BREAKPOINT',
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  COMPILETIME_ERROR = 'COMPILETIME_ERROR',
  CALL = 'CALL',
  RETURN_STATEMENT = 'RETURN'
}