import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OKRsTracker() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">OKRs Tracker</h1>
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Objetivos e Resultados-Chave</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acompanhe e gerencie os OKRs da empresa e das equipes.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Progresso Trimestral</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visualize o progresso dos OKRs por trimestre.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Metas por Área</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Acompanhe os objetivos específicos de cada área da empresa.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 