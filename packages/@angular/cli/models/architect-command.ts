import { Command, Option } from './command';
import { run, RunOptions } from '../utilities/architect';

export abstract class ArchitectCommand extends Command {
  readonly Options: Option[] = [{
    name: 'configuration',
    description: 'The configuration',
    type: String,
    aliases: ['c']
  }];

  readonly arguments = ['project'];

  abstract target: string;

  protected prodOption: Option = {
    name: 'prod',
    description: '',
    type: Boolean
  };


  // root: string;
  // project: string;
  // target: string;
  // configuration?: string;
  // overrides?: object;

  protected async runArchitect(options: RunArchitectOptions): Promise<boolean> {
    const runOptions: RunOptions = {
      target: this.target,
      root: this.project.root,
      ...options
    };
    const buildResult = await run(runOptions).toPromise();

    return buildResult.success;
  }
}

export interface RunArchitectOptions {
  app: string;
  configuration?: string;
  overrides?: object;
}
