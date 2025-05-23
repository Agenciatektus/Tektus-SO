import React from "react";
import { Layout } from "@/components/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Filter } from "lucide-react";

export function PainelDesempenhoProjetos() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Painel de Desempenho</h1>
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
              <CardTitle>Projetos Ativos</CardTitle>
              <CardDescription>Total de projetos em andamento</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-green-600">+2 novos este mês</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Taxa de Entrega</CardTitle>
              <CardDescription>Projetos entregues no prazo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">85%</p>
              <p className="text-sm text-green-600">+5% em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Horas Trabalhadas</CardTitle>
              <CardDescription>Total do mês atual</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">1.240h</p>
              <p className="text-sm text-yellow-600">-2% em relação ao mês anterior</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Satisfação</CardTitle>
              <CardDescription>Média de satisfação dos clientes</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">4.8/5</p>
              <p className="text-sm text-green-600">+0.2 em relação ao mês anterior</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Projetos por Status</CardTitle>
              <CardDescription>Distribuição atual</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Gráfico de pizza será renderizado aqui
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Progresso dos Projetos</CardTitle>
              <CardDescription>Últimos 6 meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-gray-500">
                Gráfico de barras será renderizado aqui
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default PainelDesempenhoProjetos; 