
const files = (require as any).context('.', true, /\.ts$/);
let routes: any = [];

files.keys().forEach((key: any) => {
    if (key === './index.ts') { return; }
    routes.push(files(key).default);
});

export default routes;
