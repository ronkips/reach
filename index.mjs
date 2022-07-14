import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';

const stdlib = loadStdlib();

const accHillary = await stdlib.newTestAccount(stdlib.parseCurrency(100));
const accKip = await stdlib.newTestAccount(stdlib.parseCurrency(100));

const ctcHillary = accHillary.contract(backend);
const ctcKip = accKip.contract(backend, ctcHillary.getInfo());

await Promise.all([
    ctcHillary.participants.Hillary({
    request: stdlib.parseCurrency(20),
    info: 'If you wear these, you can see beyond evil illusions.'
  }),
  ctcKip.p.Kip({
    want: (amt) => console.log(`Hillary asked Kip for ${stdlib.formatCurrency(amt)}`),
    got: (secret) => console.log(`Hillary's secret is: ${secret}`),
  }),
]);