interface Error {
  response: {
    data: {
      message: string;
    };
  };
}

export const resolveResponse = (error: Error): string => {
  if (error.response) {
    return error.response.data.message;
  } else {
    console.log(error);
    return 'Ocorreu um erro não identificado';
  }
};
