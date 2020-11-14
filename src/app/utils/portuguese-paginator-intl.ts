import { MatPaginatorIntl } from '@angular/material/paginator';

export function getPortuguesePaginatorIntl() {
    const paginatorIntl = new MatPaginatorIntl();
    paginatorIntl.itemsPerPageLabel = 'Registros por pagina:';
    paginatorIntl.nextPageLabel = 'Próxima pagina';
    paginatorIntl.previousPageLabel = 'Pagina anterior';
    paginatorIntl.lastPageLabel = 'Última pagina';
    paginatorIntl.firstPageLabel = 'Primeira pagina';
    paginatorIntl.getRangeLabel = portugueseRangeLabel;
    return paginatorIntl;
}

const portugueseRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) { return `0 de ${length}`; }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex = startIndex < length ?
        Math.min(startIndex + pageSize, length) :
        startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} de ${length}`;
};
