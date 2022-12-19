import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

/*
resolve: buildResolvers(options),

https://webpack.js.org/configuration/resolve/

 */
export function buildResolvers(options: BuildOptions): ResolveOptions {
    return {
        extensions: ['.tsx', '.ts', '.js'],
        preferAbsolute: true,

        /*
            Modules are searched for inside all directories specified in resolve.modules
         */
        modules: [options.paths.src, 'node_modules'],
        mainFiles: ['index'],
        alias: {
            '@': options.paths.src, // path.resolve(__dirname, 'src'),

            /*
            Utilities: path.resolve(__dirname, 'src/utilities/'),
            Templates: path.resolve(__dirname, 'src/templates/'),
             */
        },
    };
}
