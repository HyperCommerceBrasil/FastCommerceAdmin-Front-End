import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';
import React from 'react';
import Card from '../Card';
import { Checkbox } from '@material-ui/core';
import Button from './../Button';
import Label from '../Label';

import { Container } from './styles';
import { useCallback, useState } from 'react';
interface Status {
  code: string;
  description: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Order {
  id: string;
  numberOrder: string;
  customer: Customer;
  status: Status;
  created_at: string;
}

interface DataTable {
  orders: Order[];
}

const TableMaterial: React.FC<DataTable> = ({ children, orders }) => {
  const [selected, setSelected] = useState<string[]>([]);

  const parseStatusColor = useCallback((status: string) => {
    switch (status) {
      case '1':
        return 'warning';
      case '2':
        return 'success';
      case '3':
        return 'danger';
      case '4':
        return 'warning';
    }
  }, []);

  const addSelectedItems = useCallback(
    newValue => {
      console.log('Entrou no add');
      setSelected([...selected, newValue]);
    },
    [selected],
  );

  const removeSelectedItems = useCallback(
    newValue => {
      const newItens = selected.filter(itemSelect => {
        return itemSelect !== newValue;
      });
      setSelected(newItens);
    },
    [selected],
  );

  const isSelected = useCallback(
    (item: string) => {
      return selected.indexOf(item) !== -1;
    },
    [selected],
  );
  return (
    <Container>
      <Card color="white">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                {/* <Checkbox checked={false} /> */}
              </TableCell>
              <TableCell>N. Pedido</TableCell>
              <TableCell>Cliente</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Data</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <>
                <TableRow key={order.id}>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected(order.id)}
                      onClick={() => {
                        if (isSelected(order.id)) {
                          removeSelectedItems(order.id);
                        } else {
                          addSelectedItems(order.id);
                        }
                      }}
                    />
                  </TableCell>
                  <TableCell>{order.numberOrder}</TableCell>
                  <TableCell>{order.customer.name}</TableCell>
                  <TableCell>
                    <Label
                      colorTheme={parseStatusColor(order.status.code)}
                    >{`${order.status.code} - ${order.status.description}`}</Label>
                  </TableCell>
                  <TableCell>{order.created_at}</TableCell>
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
        <Button
          onClick={() => {
            console.log(selected);
          }}
          type="button"
          colorTheme="primary"
          style={{
            visibility: selected.length > 0 ? 'visible' : 'hidden',
            marginTop: '16px',
            width: '200px',
          }}
        >
          Gerar Embarque
        </Button>
      </Card>
    </Container>
  );
};

export default TableMaterial;
