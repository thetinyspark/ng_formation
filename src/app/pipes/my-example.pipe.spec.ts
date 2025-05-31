import { MyExamplePipe } from './my-example.pipe';

describe('MyExamplePipe', () => {
  it('create an instance', () => {
    const pipe = new MyExamplePipe();
    expect(pipe).toBeTruthy();
  });
});
