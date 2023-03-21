import Http from "http";

declare module "http" {
  interface IncomingMessage {
    files: Express.Multer.File[];
    body: any;
  }
}
