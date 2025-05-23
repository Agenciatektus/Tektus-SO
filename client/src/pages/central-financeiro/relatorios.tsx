function RelatoriosFinanceiros() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Relatórios Financeiros</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>DRE</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Demonstração do resultado do exercício.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Balanço</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Balanço patrimonial.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fluxo de Caixa</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Relatório de fluxo de caixa.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
export default RelatoriosFinanceiros;
export { RelatoriosFinanceiros }; 