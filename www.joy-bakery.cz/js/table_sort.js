// table sort function

const tableSort = (table_name) => {

    // get correct table

    const table = document.querySelector(`table[data-name='${table_name}']`);

    // To store search data

    const table_body = table.querySelector('.sage-sortable-table-body');

    // Get each row data
    const rows = table.querySelectorAll(`tr`);

    // get sortable data (start at one to exclude the header)

    let display_rows = [];

    for (let i = 1; i < rows.length; i++) {
        const data_boxes = rows[i].querySelectorAll(`td`);
        let data_values = [];
        data_boxes.forEach(box => {
            data_values.push(box.innerText);
        })

        rows[i]['data_values'] = data_values;
        display_rows.push(rows[i]);

    }

    // get the sort array positions

    const head_cells = rows[0].querySelectorAll('th');

    let sort_buttons = [];

    for (let i = 0; i < head_cells.length; i++) {
        if (head_cells[i].hasChildNodes()) {
            const children = head_cells[i].childNodes;
            children.forEach(child => {
                if (child.className !== undefined && child.className.includes('sage-sort-btn')) {
                    child['column_position'] = i;
                    child['direction'] = 'up';
                    sort_buttons.push(child);
                }
            })
        }
    }

    const sortTableRows = (column_position, type, direction) => {
        table_body.innerHTML = "";

        const sortText = (a, b) => {
            const text_a = a['data_values'][column_position].toLowerCase();
            const text_b = b['data_values'][column_position].toLowerCase();
            if (text_a === text_b) {
                return 0;
            }

            return text_a < text_b ? 1 : -1;
        }

        const sortNumber = (a, b) => {

            let number_a = parseFloat(a['data_values'][column_position].replace(/[.,]/gi, ""));
            let number_b = parseFloat(b['data_values'][column_position].replace(/[.,]/gi, ""));

            number_a = isNaN(number_a) ? 0 : number_a;
            number_b = isNaN(number_b) ? 0 : number_b;

            if (number_a === number_b) {
                return 0;
            }

            return number_a < number_b ? 1 : -1;
        }

        const sortDate = (a, b) => {
            const date_input_a = a['data_values'][column_position];
            const date_input_b = b['data_values'][column_position];

            const date_for_sorting_a = isNaN(date_input_a[2]) ? date_input_a.split("-").reverse().join("-") : date_input_a;
            const date_for_sorting_b = isNaN(date_input_b[2]) ? date_input_a.split("-").reverse().join("-") : date_input_b;

            let date_a = new Date(date_for_sorting_a);
            let date_b = new Date(date_for_sorting_b);

            if (date_a === date_b) {
                return 0;
            }

            return date_a < date_b ? 1 : -1;
        }

        const sortTime = (a, b) => {
            let time_a = parseInt(a['data_values'][column_position]);
            let time_b = parseInt(b['data_values'][column_position]);

            if (time_a === time_b) {
                return 0;
            }

            return time_a < time_b ? 1 : -1;
        }

        if (type === 'text') {
            display_rows.sort(sortText);
        }

        if (type === 'number') {
            display_rows.sort(sortNumber);
        }

        if (type === 'date') {
            display_rows.sort(sortDate);
        }

        if (type === 'time') {
            display_rows.sort(sortTime);
        }

        if (direction === 'up') {
            display_rows.reverse();
        }

        display_rows.forEach(row => table_body.appendChild(row));
    }

    sort_buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            sortTableRows(btn['column_position'], btn.dataset['type'], btn['direction']);
            btn['direction'] = btn['direction'] === 'down' ? 'up' : 'down';
        })
    })

}