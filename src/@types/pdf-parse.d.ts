declare module 'pdf-parse' {
  function pdf(input: Buffer | Uint8Array): Promise<{ text: string }>;
  export = pdf;
}
