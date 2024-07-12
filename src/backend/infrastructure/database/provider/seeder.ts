import { DatabaseProvider } from '.';

const main = async () => {
  await DatabaseProvider.initialize();
};

main();
