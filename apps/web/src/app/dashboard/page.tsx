import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  { label: "Produtos", value: "—", description: "cadastrados" },
  { label: "Estoque", value: "—", description: "itens em estoque" },
  { label: "Vendas", value: "—", description: "este mês" },
  { label: "Clientes", value: "—", description: "cadastrados" },
];

const navItems = [
  { label: "Dashboard", href: "/dashboard", active: true },
  { label: "Produtos", href: "/dashboard/produtos" },
  { label: "Estoque", href: "/dashboard/estoque" },
  { label: "Vendas", href: "/dashboard/vendas" },
  { label: "Clientes", href: "/dashboard/clientes" },
  { label: "Fornecedores", href: "/dashboard/fornecedores" },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-56 bg-sidebar flex-shrink-0 flex flex-col">
        <div className="px-5 py-6 border-b border-sidebar-border">
          <span className="text-xl font-bold text-sidebar-foreground tracking-tight">
            Sigma
          </span>
          <p className="text-xs text-sidebar-foreground/60 mt-0.5">
            Gestão de Madeireiras
          </p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                item.active
                  ? "bg-sidebar-accent text-sidebar-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-sidebar-border">
          <a
            href="/"
            className="text-xs text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
          >
            Sair
          </a>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Dashboard</h1>
          <span className="text-sm text-muted-foreground">Bem-vindo</span>
        </header>

        {/* Content */}
        <main className="flex-1 p-8 space-y-8">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Visão Geral
            </h2>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map((stat) => (
                <Card key={stat.label} className="shadow-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
              Atividade Recente
            </h2>
            <Card className="shadow-sm">
              <CardContent className="py-12 text-center">
                <p className="text-sm text-muted-foreground">
                  Nenhuma atividade registrada ainda.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
