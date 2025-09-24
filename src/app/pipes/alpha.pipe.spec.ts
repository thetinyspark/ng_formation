import { AlphaPipe } from './alpha.pipe';

fdescribe('AlphaPipe', () => {

  const MOCK_STRINGS = [
    "Camembert",
    "Babybel", 
    "Roquefort", 
    "Emmental", 
    "Comté", 
    "Bleu", 
    "Munster"
  ];

  const MOCK_STRINGS_ALPHA = [
    "Babybel", 
    "Bleu", 
    "Camembert",
    "Comté", 
    "Emmental", 
    "Munster",
    "Roquefort"
  ];

  it('create an instance', () => {
    const pipe = new AlphaPipe();
    expect(pipe).toBeTruthy();
  });

  it('returns a non empty array', 
    ()=>{
      // given
      const pipe = new AlphaPipe();

      // when
      const results = pipe.transform(MOCK_STRINGS);

      // then
      expect(results.length).not.toEqual(0);
    }
  );

  it('returns the same numbers of elements', 
    ()=>{
      // given
      const pipe = new AlphaPipe();

      // when
      const results = pipe.transform(MOCK_STRINGS);

      // then
      expect(results.length).toEqual(MOCK_STRINGS.length);
    }
  );

  it('returns the same elements but in alphabetical order', 
    ()=>{
      // given
      const pipe = new AlphaPipe();

      // when
      const results = pipe.transform(MOCK_STRINGS);

      // then
      expect(results).toEqual(MOCK_STRINGS_ALPHA);
    }
  );
});
