// editor.js
var editor; // Declare the editor variable

// Function to destroy GrapeJS instance
function destroyEditor() {
    if (editor) {
        editor.destroy();
    }
    // Clear local storage to ensure a clean slate
    localStorage.clear();
}

// Function to initialize GrapeJS
function initEditor() {
    editor = grapesjs.init({
        container: '#gjs',
        // Add more features and customization here
    });

    // Add blocks using BlockManager
    editor.BlockManager.add('section', {
        id: 'section',
        label: '<b>Section</b>',
        attributes: { class: 'gjs-block-section' },
        content: `<section>
            <h1>This is a simple title</h1>
            <div>This is just a Lorem text: Lorem ipsum dolor sit amet</div>
        </section>`,
    });

    editor.BlockManager.add('text', {
        id: 'text',
        label: 'Text',
        content: '<div data-gjs-type="text">Insert your text here</div>',
    });

    editor.BlockManager.add('image', {
        id: 'image',
        label: 'Image',
        select: true,
        content: { type: 'image' },
        activate: true,
    });

    // Add heading blocks (H1 to H6)
    for (let i = 1; i <= 6; i++) {
        editor.BlockManager.add(`heading-${i}`, {
            id: `heading-${i}`,
            label: `Heading ${i}`,
            content: `<h${i}>Insert your heading here</h${i}>`,
        });
    }
    editor.DomComponents.addType('custom', {
        model: {
            defaults: {
                traits: [
                    // Define traits for customization
                    'fontweight',
                    'text-align',
                    'color',
                ],
            },
        },
    });

    // // Add a custom block that uses the 'custom' component type
    // editor.BlockManager.add('custom-block', {
    //     id: 'custom-block',
    //     label: 'Custom Block',
    //     content: '<div data-gjs-type="custom">Custom Block Content</div>',
    // });


    // Add a column block (col-4)
    // Wait for GrapeJS to be fully initialized before rendering blocks
    editor.on('load', function () {
        // Append blocks to the specified container
        editor.BlockManager.render({
            appendTo: '#blocks',
        });
    });
    editor.on('component:selected', function (model) {
        // Check if the selected component is of type 'custom'
        if (model && model.is('custom')) {
            // Apply styles to the selected component
            model.setStyle({
                'font-weight': 'bold', // Customize font weight
                'text-align': 'center', // Customize text alignment
                'color': '#ff0000', // Customize text color
            });
        }})
    
}

// Destroy the editor when the page is unloaded
window.addEventListener('beforeunload', destroyEditor);

// Initialize the editor when the page is loaded
window.addEventListener('load', initEditor);
