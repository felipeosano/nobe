import { Request, Response, NextFunction } from 'express';

export const responseFormatter = (req: Request, res: Response, next: NextFunction) => {
  const defaultSend = res.send;
  const isSuccess = res.statusCode >= 200 && res.statusCode < 300;

  res.send = function (data: any) {
    const responseFormat = {
      success: isSuccess,
      status: res.statusCode,
      data: data,
    };

    res.setHeader('Content-Type', 'application/json');
    defaultSend.call(this, JSON.stringify(responseFormat));
    return this;
  };

  next();
};
