export default (text = 'Hello world') => {
    const element = document.createElement('div');
    element.innerHTML = text;
    element.className = 'test';
    element.id = 'test';

    // element.onclick = () =>
    //     import('./lazy')
    //         .then(lazy => {
    //             element.textContent = lazy.default;
    //         })
    //         .catch(err => {
    //             console.error(err);
    //         });

    return element;
};
