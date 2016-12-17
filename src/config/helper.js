const fetchComponent = function (path) {
    let component = resolve => {
        require.ensure([path], () => {
            resolve(require(path))
        })
    };
    console.log(component);
    return component;
};

export default  {
    fetchComponent: fetchComponent
};