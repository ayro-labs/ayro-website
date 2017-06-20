import { ChatzWebPage } from './app.po';

describe('chatz-web App', () => {
  let page: ChatzWebPage;

  beforeEach(() => {
    page = new ChatzWebPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
