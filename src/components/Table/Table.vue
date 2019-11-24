<template>
  <div class="vw-table">
    <TableControl >
      <TableCol>
        <TableSearch />
      </TableCol>
    </TableControl>
    <TableList></TableList>
    <TableControl>
      <TableCol>
        <TableTotal />
      </TableCol>
      <TableCol>
        <TableItemPerPage />
      </TableCol>
      <TableCol>
        <TablePagination />
      </TableCol>
    </TableControl>
  </div>
</template>
