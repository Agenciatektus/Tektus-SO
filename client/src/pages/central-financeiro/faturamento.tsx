import React from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter } from "lucide-react";

export function Faturamento() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Faturamento</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="w-4 h-4 mr-2" />
              Período
            </Button>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader>
              <CardTitle>Faturamento Mensal</CardTitle>
              <CardDescription>Total do mês atual</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 45.000,00</p>
              <p className="text-sm text-green-600">+12% em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Faturamento Anual</CardTitle>
              <CardDescription>Total do ano atual</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 320.000,00</p>
              <p className="text-sm text-green-600">+8% em relação ao ano anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contas a Receber</CardTitle>
              <CardDescription>Total pendente</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 15.000,00</p>
              <p className="text-sm text-yellow-600">5 contas pendentes</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ticket Médio</CardTitle>
              <CardDescription>Valor médio por fatura</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">R$ 2.500,00</p>
              <p className="text-sm text-green-600">+5% em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Faturamento por Mês</CardTitle>
              <CardDescription>Últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Gráfico de barras será renderizado aqui
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Faturamento por Categoria</CardTitle>
              <CardDescription>Distribuição por tipo de serviço</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Gráfico de pizza será renderizado aqui
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default Faturamento; 