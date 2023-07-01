import Http from "http";

declare module "http" {
  interface IncomingMessage {
    file?: Express.Multer.File;
    files: Express.Multer.File[];
    body: any;
  }
}
