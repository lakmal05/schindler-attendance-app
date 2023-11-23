import React from 'react';
import {Table } from 'antd';

const fixedColumns = [
    {
        title: 'RowHead',
        dataIndex: 'key',
        rowScope: 'row',
        fixed: true,
      width: 100,
      },
    {
      title: 'Name',
      dataIndex: 'name',
      fixed: true,
      width: 100,
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
      {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
      },
      {
        title: 'Action',
        key: 'action',
        dataIndex: 'action',
      },
  ];
  const fixedData = [];
  for (let i = 0; i < 1; i += 1) {
    fixedData.push(
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
            action : 'hansika'
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
            action : 'hansika'
          },
          {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
            action : 'hansika'
          },
          {
            key: '4',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
            action : 'hansika'
          },
          {
            key: '5',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
            action : 'hansika'
          },
          {
            key: '6',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
            action : 'hansika'
          },
          {
            key: '7',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
            action : 'hansika'
          },
          {
            key: '8',
            name: 'Joe Black',
            age: 32,
            address: 'Sydney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
            action : 'hansika'
          },
    );
  }

const TableData = () => (
    <>
      <Table
        columns={fixedColumns}
        dataSource={fixedData}
        pagination={false}
        style={{width:600}}
        scroll={{
          x: 2000,
          y: 200,
        }}
        bordered
      />
    </>
  );
export default TableData;