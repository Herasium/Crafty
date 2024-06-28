
function handleError(message, source, lineno, colno, error) {

    alert(`    
        Crafty Crash. Oops !  
        Please look at the console.  
    `)

    console.log(`
        ██████╗██████╗  █████╗ ███████╗██╗  ██╗
       ██╔════╝██╔══██╗██╔══██╗██╔════╝██║  ██║
       ██║     ██████╔╝███████║███████╗███████║
       ██║     ██╔══██╗██╔══██║╚════██║██╔══██║
       ╚██████╗██║  ██║██║  ██║███████║██║  ██║
        ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                                               
    `)
    console.log('Message: ' + message);
    console.log('Source: ' + source);
    console.log('Line: ' + lineno);
    console.log('Column: ' + colno);
    console.log('Error object: ', error);
}

window.onerror = handleError;
