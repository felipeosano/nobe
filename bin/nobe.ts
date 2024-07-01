#!/usr/bin/env node

import { Command } from 'commander';
import { init } from './commands/init';
import { setupGenerateCommand } from './commands/create-layers';

const program = new Command();

init(program);
setupGenerateCommand(program);
program.parse(process.argv);
