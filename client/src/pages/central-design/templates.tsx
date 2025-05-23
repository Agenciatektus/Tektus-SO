import React from "react";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Filter, Download, Layout, Palette, Type } from "lucide-react";

export function TemplatesDesign() {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Templates de Design</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Template
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Layout className="w-5 h-5 text-blue-500" />
                <CardTitle>Layouts</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">24 templates</Badge>
                  <span className="text-sm text-gray-500">Última atualização: 1d atrás</span>
                </div>
                <p className="text-sm text-gray-600">
                  Templates de layout para websites, aplicativos e materiais impressos.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>4 categorias</span>
                  <span>•</span>
                  <span>Figma, Adobe XD</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-green-500" />
                <CardTitle>Elementos</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">56 templates</Badge>
                  <span className="text-sm text-gray-500">Última atualização: 2d atrás</span>
                </div>
                <p className="text-sm text-gray-600">
                  Componentes reutilizáveis, ícones e elementos de interface.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>6 categorias</span>
                  <span>•</span>
                  <span>Figma, Sketch</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Type className="w-5 h-5 text-purple-500" />
                <CardTitle>Tipografia</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">18 templates</Badge>
                  <span className="text-sm text-gray-500">Última atualização: 3d atrás</span>
                </div>
                <p className="text-sm text-gray-600">
                  Sistemas de tipografia e estilos de texto para diferentes projetos.
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>3 categorias</span>
                  <span>•</span>
                  <span>Figma, Adobe</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export default TemplatesDesign; 