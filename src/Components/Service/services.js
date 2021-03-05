export async function getData(url) {
    const header = new Headers( { method: 'GET', mode: 'cors', cache: 'default' } );
    const request = new Request(url, header);

    return (
        fetch(request)
        .then(response => response.json()
            .then(result => result)
            .catch(err => console.log(err)))
        .catch(err => console.log(err))
    );
}

