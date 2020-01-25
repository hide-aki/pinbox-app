
// TODO: put lang code here!
const collator = new Intl.Collator('en', {
    sensitivity: 'accent'
});

export const caseInsensitiveSortFn = collator.compare;
