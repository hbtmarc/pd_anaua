
const STORAGE_KEY = 'checklist_stl';
const APP_VERSION = 33;
const checklist = [
  {
    "id": "s01-preparacao",
    "short": "01 Preparação",
    "title": "01 — Preparação da bancada",
    "kicker": "Comece antes das mochilas",
    "goal": "Separar tudo por função antes de guardar, para evitar retrabalho, esquecimento e excesso na Assault.",
    "items": [
      {
        "id": "s01-01",
        "title": "Abrir área de montagem",
        "lead": "Base limpa de montagem:",
        "bullets": [
          "Abrir Defender 55L",
          "Abrir Assault 30–35L",
          "Deixar mesa/cama livre",
          "Separar sacos/organizadores"
        ],
        "details": [
          {
            "title": "Método",
            "items": [
              "Use uma superfície limpa e visível. O primeiro erro de mala é guardar item antes de enxergar o conjunto.",
              "Abra as duas mochilas e deixe bolsos principais acessíveis. Não comece pelo bolso pequeno.",
              "Separe sacos, ziplocks, velcros, cases e estojos antes dos equipamentos."
            ]
          }
        ],
        "tags": [
          "preparacao"
        ],
        "critical": true
      },
      {
        "id": "s01-02",
        "title": "Separar pilha Defender",
        "lead": "Mala-base de transporte:",
        "bullets": [
          "Roupas e higiene",
          "Energia e carregadores",
          "MacBook, leitor e backup",
          "Acessórios grandes",
          "Manutenção e reservas"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "A Defender é a mala que transporta a base e depois vira escritório técnico na pousada.",
              "Se o item serve para recarga, backup, manutenção, roupa, frio ou cena planejada, ele começa na Defender.",
              "A Defender deve chegar fácil de desmontar no quarto, não apenas cheia."
            ]
          }
        ],
        "tags": [
          "preparacao",
          "defender"
        ],
        "critical": true
      },
      {
        "id": "s01-03",
        "title": "Separar pilha Assault inicial",
        "lead": "Captação desde o embarque:",
        "bullets": [
          "ZV-E10 pronta",
          "iPhone/Osmo se for usar",
          "Lark Max 2",
          "GoPro",
          "Cartões, baterias e power bank",
          "Documento e dinheiro"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "A Assault precisa sair pronta porque a gravação começa no início da viagem, não apenas depois da pousada.",
              "Ela deve cobrir embarque, van, estrada, falas de organização e primeiras cenas espontâneas.",
              "Leve o mínimo funcional: imagem, áudio, energia, dados e controle pessoal."
            ]
          }
        ],
        "tags": [
          "preparacao",
          "assault",
          "captacao"
        ],
        "critical": true
      },
      {
        "id": "s01-04",
        "title": "Definir regra de cartões",
        "lead": "Mídia sem improviso:",
        "bullets": [
          "Todos em estojo",
          "Vazio de um lado",
          "Usado do outro",
          "Nunca formatar sem backup",
          "Nada de cartão solto"
        ],
        "details": [
          {
            "title": "Regra fixa",
            "items": [
              "Cartão solto é risco real de perda. O estojo deve sair pronto antes de qualquer câmera ser fechada.",
              "Use orientação física para status: cartões vazios em uma posição, cartões usados em outra.",
              "Essa regra vale para SD da ZV-E10, microSD do drone/RC2 e microSD da GoPro."
            ]
          }
        ],
        "tags": [
          "preparacao",
          "dados"
        ],
        "critical": true
      }
    ]
  },
  {
    "id": "s02-defender",
    "short": "02 Defender",
    "title": "02 — Montagem da Defender",
    "kicker": "Mala-base · transporte e pousada",
    "goal": "Fechar a Defender agrupada por equivalência: roupas, energia, dados, acessórios grandes e manutenção.",
    "items": [
      {
        "id": "s02-01",
        "title": "Montar roupas, frio e higiene",
        "lead": "Compartimento principal e laterais:",
        "bullets": [
          "3 camisetas leves: sábado, domingo e 1 reserva",
          "1 calça confortável para noite/frio",
          "1 bermuda ou peça leve para deslocamento",
          "1 pijama leve",
          "1 sunga ou roupa de banho",
          "3 cuecas: 2 dias + 1 reserva",
          "3 pares de meia: 2 dias + 1 reserva",
          "1 chinelo e 1 calçado confortável para pedra/trilha",
          "1 agasalho forte + 1 corta-vento/capa de chuva",
          "1 toalha + nécessaire isolada",
          "Sacos separados para roupa suja, roupa molhada e lixo"
        ],
        "details": [
          {
            "title": "Montagem por camada",
            "items": [
              "Fundo da Defender: toalha, pijama, sunga/roupa de banho e peças que não precisam sair rápido. Eles criam uma base macia.",
              "Laterais: 3 camisetas, bermuda, calça, cuecas e meias enroladas para preencher volume e amortecer o miolo técnico.",
              "Topo: agasalho forte e corta-vento/capa. No sábado, o roteiro sai do Sobradinho direto para Pedra/Pirâmide, então frio precisa migrar para a Assault antes da tarde.",
              "Nécessaire e líquidos ficam em saco próprio, longe de MacBook, cartões, lentes, microfones e carregadores.",
              "Sacos de roupa suja, roupa molhada e lixo ficam dobrados no topo/lateral para uso rápido."
            ]
          },
          {
            "title": "Quantidade mínima coerente",
            "items": [
              "Para dois dias, leve 2 trocas reais e 1 reserva de camiseta, cueca e meia.",
              "A reserva cobre suor, água, chuva, frio e eventual atraso no retorno.",
              "Não leve volume extra de roupa além disso, porque a Defender também transporta a base técnica."
            ]
          }
        ],
        "tags": [
          "defender",
          "roupas"
        ],
        "critical": true
      },
      {
        "id": "s02-02",
        "title": "Montar setor de energia e baterias",
        "lead": "Defender · carregar primeiro o que sustenta captação:",
        "bullets": [
          "Fonte original Apple + cabo USB-C para MagSafe 3",
          "Carregador Baseus 140W para Ugreen, iPhone e GoPro",
          "Estação 330W AS330W para matriz audiovisual",
          "4 cabos USB-C USB4 240W/40Gbps",
          "Carregador/caixa NP-FW50 da ZV-E10",
          "Cabos/carregadores DJI, GoPro, Hollyland, iPhone e Osmo",
          "Power bank Ugreen 25.000 mAh",
          "Velcros/elásticos para prender cabos",
          "Setores separados: Apple, Baseus, 330W e dispositivos finais"
        ],
        "details": [
          {
            "title": "Separação correta",
            "items": [
              "Apple/MagSafe fica junto do MacBook.",
              "Baseus 140W fica no setor boost: Ugreen, iPhone e Osmo.",
              "330W fica no setor audiovisual: DJI, Sony, Lark, luzes, GoPro e acessórios.",
              "Cabos USB4 ficam presos e identificados para não misturar com cabos leves."
            ]
          }
        ],
        "tags": [
          "defender",
          "energia"
        ],
        "critical": true
      },
      {
        "id": "s02-03",
        "title": "Montar setor de dados e backup",
        "lead": "Costado protegido:",
        "bullets": [
          "MacBook em sleeve",
          "Leitor Ugreen SD + TF",
          "2 pendrives SanDisk",
          "Pasta do projeto criada",
          "Cartões preservados"
        ],
        "details": [
          {
            "title": "Montagem",
            "items": [
              "MacBook fica no costado acolchoado ou área mais protegida da Defender.",
              "Leitor Ugreen e pendrives ficam junto do MacBook, porque pertencem ao fluxo de ingest.",
              "A estrutura de pastas deve existir antes do primeiro backup: ZVE10, IPHONE, GOPRO, DRONE, AUDIO, SELECTS, DAVINCI e EXPORTS."
            ]
          }
        ],
        "tags": [
          "defender",
          "dados"
        ],
        "critical": true
      },
      {
        "id": "s02-04",
        "title": "Montar acessórios grandes",
        "lead": "Miolo protegido:",
        "bullets": [
          "Scorp Mini 3 Pro e kit",
          "Ulanzi MT-44",
          "VL120 e fill light",
          "Osmo se não sair no início",
          "Case rígido do Mini 4 Pro"
        ],
        "details": [
          {
            "title": "Montagem",
            "items": [
              "Coloque acessórios grandes no miolo da Defender, protegidos pelas roupas laterais.",
              "Scorp, MT-44 e VL120 são para cena planejada, pousada, depoimento ou apoio controlado.",
              "Osmo fica na Defender apenas se não for usado no embarque; caso contrário, vai para a Assault inicial."
            ]
          }
        ],
        "tags": [
          "defender",
          "estabilizacao",
          "iluminacao",
          "drone"
        ],
        "critical": true
      },
      {
        "id": "s02-05",
        "title": "Montar manutenção e reservas",
        "lead": "Bolso lateral/miolo:",
        "bullets": [
          "Kica JetFan",
          "Ventilador ZV-E10",
          "Dummy battery USB-C",
          "Flanelas extras",
          "Sílica, ziplocks e presilhas"
        ],
        "details": [
          {
            "title": "Montagem",
            "items": [
              "Manutenção deve ficar separada de mídia e energia para não virar bolso de tudo.",
              "Kica JetFan é para sopro/limpeza leve e secagem superficial; não usar contra sensor ou lente aberta.",
              "Ventilador da ZV-E10 e dummy battery são de setup estático, gravação longa ou depoimento, não de trilha."
            ]
          }
        ],
        "tags": [
          "defender",
          "manutencao"
        ],
        "critical": true
      }
    ]
  },
  {
    "id": "s03-assault-inicial",
    "short": "03 Assault inicial",
    "title": "03 — Assault inicial",
    "kicker": "Pronta para gravar antes da pousada",
    "goal": "Montar uma mochila leve para abertura da viagem: imagem, áudio, energia, dados e controle.",
    "items": [
      {
        "id": "s03-01",
        "title": "Montar kit ZV-E10",
        "lead": "Topo de acesso rápido:",
        "bullets": [
          "ZV-E10 com cage",
          "Viltrox 15mm montada",
          "Bateria carregada",
          "SD inserido",
          "ND principal acessível"
        ],
        "details": [
          {
            "title": "Uso",
            "items": [
              "A ZV-E10 fica pronta para captar planos hero de mochila, van, estrada, chegada e primeiras cenas de grupo.",
              "A 15mm é a lente padrão para abertura e contexto. A 23mm pode ficar protegida na lateral interna se houver chance de retrato/depoimento."
            ]
          }
        ],
        "tags": [
          "assault",
          "camera",
          "captacao"
        ],
        "critical": true
      },
      {
        "id": "s03-02",
        "title": "Montar kit vertical",
        "lead": "Movimento rápido:",
        "bullets": [
          "iPhone com espaço livre",
          "Osmo Mobile 6 carregado",
          "Gravação 9:16",
          "Bastidores e transições",
          "Cabo curto de energia"
        ],
        "details": [
          {
            "title": "Uso",
            "items": [
              "iPhone/Osmo é a ferramenta mais rápida para caminhar, entrar na van, captar bastidor e transição.",
              "O Plano Diretor é vertical; se houver dúvida, grave primeiro em 9:16."
            ]
          }
        ],
        "tags": [
          "assault",
          "camera",
          "captacao"
        ],
        "critical": true
      },
      {
        "id": "s03-03",
        "title": "Montar kit áudio",
        "lead": "Som limpo desde o começo:",
        "bullets": [
          "Lark Max 2 carregado",
          "Deadcat",
          "Cabo câmera",
          "Cabo celular",
          "Case protegido"
        ],
        "details": [
          {
            "title": "Uso",
            "items": [
              "Áudio pode valer mais que imagem no início: fala de guia, orientação, porta da van, zíper e expectativa.",
              "Deixe cabo para Sony e cabo para celular no mesmo ponto, sem depender de procurar no bolso de energia."
            ]
          }
        ],
        "tags": [
          "assault",
          "audio",
          "captacao"
        ],
        "critical": true
      },
      {
        "id": "s03-04",
        "title": "Montar kit ação e energia",
        "lead": "Campo sem travar:",
        "bullets": [
          "GoPro pronta",
          "Power bank Ugreen",
          "Cabos curtos",
          "Baterias cheias/usadas separadas",
          "Ziplock e flanela"
        ],
        "details": [
          {
            "title": "Uso",
            "items": [
              "GoPro cobre risco, água, POV e movimento. No início, ela é reserva ágil.",
              "Power bank fica perto do costado para equilibrar peso.",
              "Baterias e cartões precisam de posição fixa."
            ]
          }
        ],
        "tags": [
          "assault",
          "gopro",
          "energia",
          "dados"
        ],
        "critical": true
      },
      {
        "id": "s03-05",
        "title": "Montar bolso frontal",
        "lead": "Controle sem abrir equipamento:",
        "bullets": [
          "Documento",
          "Dinheiro/cartão",
          "Chave",
          "Remédio essencial",
          "Itens pequenos de acesso rápido"
        ],
        "details": [
          {
            "title": "Uso",
            "items": [
              "Bolso frontal não deve ter lente, cartão solto nem bateria misturada.",
              "Entradas, pagamentos e identificação precisam estar acessíveis sem abrir câmera, áudio ou drone."
            ]
          }
        ],
        "tags": [
          "assault",
          "controle"
        ],
        "critical": true
      }
    ]
  },
  {
    "id": "s04-pousada",
    "short": "04 Pousada",
    "title": "04 — Pousada: escritório técnico",
    "kicker": "Desmontar Defender com método",
    "goal": "Ao chegar, transformar a Defender em estação de trabalho: recarga, backup, manutenção e remontagem da Assault.",
    "items": [
      {
        "id": "s04-01",
        "title": "Abrir escritório do quarto",
        "lead": "Três zonas fixas:",
        "bullets": [
          "Energia",
          "Dados/backup",
          "Manutenção",
          "Roupas fora da mesa técnica",
          "Assault em ponto separado"
        ],
        "details": [
          {
            "title": "Montagem",
            "items": [
              "A Defender deixa de ser mala fechada e vira base operacional.",
              "Monte energia em um lado, dados no centro e manutenção separada.",
              "Roupas, chinelo e higiene ficam longe da mesa técnica."
            ]
          }
        ],
        "tags": [
          "pousada",
          "defender"
        ],
        "critical": true
      },
      {
        "id": "s04-02",
        "title": "Montar estação técnica de baterias",
        "lead": "Pousada · use o mapa completo e execute por prioridade:",
        "bullets": [
          "Abrir desenho completo da energia",
          "Montar linha Apple/MagSafe para MacBook",
          "Montar Baseus: Ugreen, iPhone e GoPro",
          "Montar AS330W: drone, RC2, NP-FW50, Lark, Osmo e luzes",
          "Separar cartões, leitor Ugreen e pendrives da zona de energia",
          "Prender cabos e manter nada no chão"
        ],
        "details": [
          {
            "type": "power-diagram",
            "title": "Desenho visual completo"
          },
          {
            "title": "Critério de execução",
            "items": [
              "Não use o card como tabela técnica; ele é apenas o checklist físico.",
              "A tabela detalhada de voltagem, amperagem, potência e tempo fica no desenho completo.",
              "Depois de montar, confira a ordem: power bank, drone, controle, Sony, áudio, celular, GoPro, Osmo e luzes."
            ]
          }
        ],
        "tags": [
          "pousada",
          "energia"
        ],
        "critical": true
      },
      {
        "id": "s04-03",
        "title": "Montar ingest e backup",
        "lead": "Mídia protegida:",
        "bullets": [
          "MacBook aberto",
          "Leitor Ugreen conectado",
          "Pastas por origem",
          "Cartões usados separados",
          "Pendrives como apoio"
        ],
        "details": [
          {
            "title": "Montagem",
            "items": [
              "A área de dados deve ficar limpa: sem líquidos, sem roupa molhada e sem acessórios soltos.",
              "Copie por origem: ZVE10, IPHONE, GOPRO, DRONE e AUDIO.",
              "Cartão usado permanece preservado até cópia validada."
            ]
          }
        ],
        "tags": [
          "pousada",
          "dados"
        ],
        "critical": true
      },
      {
        "id": "s04-04",
        "title": "Remontar Assault por saída",
        "lead": "Mochila de campo:",
        "bullets": [
          "Selecionar roteiro do próximo bloco",
          "Levar só o necessário",
          "Repor baterias e cartões",
          "Testar áudio/câmera",
          "Deixar Defender fechável"
        ],
        "details": [
          {
            "title": "Montagem",
            "items": [
              "Antes de cada saída, veja o bloco do roteiro e remonte a Assault com base nele.",
              "Drone, Osmo, MT-08, GoPro e acessórios opcionais entram quando o bloco pede, não por ansiedade de levar tudo.",
              "A Defender fica como base; a Assault sai limpa e intencional."
            ]
          }
        ],
        "tags": [
          "pousada",
          "assault",
          "captacao"
        ],
        "critical": true
      }
    ]
  },
  {
    "id": "s05-plano",
    "short": "05 Plano",
    "title": "05 — Plano Diretor de bolso",
    "kicker": "Regras editoriais antes do roteiro",
    "goal": "Usar o plano como mapa de decisão: o que sustenta a campanha, o que é prioridade e o que pode ser cortado.",
    "items": [
      {
        "id": "s05-01",
        "title": "Confirmar entregas narrativas",
        "lead": "Reels e função:",
        "bullets": [
          "R01 Manifesto",
          "R02 Participante",
          "R03 Natureza",
          "R04 Equipe/bastidores",
          "R05 Depoimentos se houver fala forte"
        ],
        "details": [
          {
            "title": "Como usar",
            "items": [
              "Todo take precisa alimentar alguma entrega. Se não alimenta, vira respiro ou descarte.",
              "R05 só existe se depoimento e áudio forem fortes."
            ]
          }
        ],
        "tags": [
          "plano"
        ],
        "critical": true
      },
      {
        "id": "s05-02",
        "title": "Confirmar regra vertical",
        "lead": "Formato principal:",
        "bullets": [
          "9:16 antes de horizontal",
          "Sujeito com espaço para texto",
          "Pele e céu protegidos",
          "Capa pensada no take",
          "Horizontal só como bônus"
        ],
        "details": [
          {
            "title": "Como usar",
            "items": [
              "A campanha é para Reels; o vertical é matriz, não adaptação.",
              "Não grave apenas paisagem aberta. Inclua pessoa, gesto, escala e espaço limpo para legenda/capa."
            ]
          }
        ],
        "tags": [
          "plano",
          "captacao"
        ],
        "critical": true
      },
      {
        "id": "s05-03",
        "title": "Confirmar som real",
        "lead": "Foleys obrigatórios:",
        "bullets": [
          "Porta da van",
          "Zíper/mochila",
          "Passos na pedra",
          "Xícara/colher",
          "Água",
          "Vento",
          "Silêncio da roda"
        ],
        "details": [
          {
            "title": "Como usar",
            "items": [
              "Reserve 10 a 20 segundos para sons limpos quando o ambiente permitir.",
              "Som real costura edição e tira o vídeo da aparência de aftermovie genérico."
            ]
          }
        ],
        "tags": [
          "plano",
          "audio"
        ],
        "critical": true
      }
    ]
  },
  {
    "id": "s06-sexta-shotlist",
    "short": "06 Sexta",
    "title": "06 — Shotlist: sexta, embarque e estrada",
    "kicker": "Linha do tempo · abertura",
    "goal": "Registrar o começo da experiência sem atrasar o grupo.",
    "items": [
      {
        "id": "shot-01",
        "title": "01 — Embarque",
        "lead": "Prioridade A · 9V-VE · iPhone + Osmo",
        "bullets": [
          "Mochila no ombro",
          "Porta da van",
          "Pés entrando",
          "Expressão de expectativa",
          "Som de van e vozes gerais"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Captar close de mochila, pés, porta da van e chegada discreta do participante.",
              "Não mostrar documentos, placas sensíveis ou rostos constrangidos.",
              "Filmar curto, estável e sem atrasar embarque."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sexta",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R02",
            "R04"
          ]
        }
      },
      {
        "id": "shot-02",
        "title": "02 — Equipe orienta",
        "lead": "Prioridade A · 9V · Sony 23mm/iPhone + Lark",
        "bullets": [
          "Boas-vindas",
          "Orientação de horário",
          "Tolerância/assentos",
          "Grupo ao fundo",
          "Gesto real de condução"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Mostrar cuidado, organização e segurança sem parecer fala institucional.",
              "Capte meio-corpo da equipe e grupo ao fundo.",
              "Priorize fala curta e limpa."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sexta",
          "audio",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R04"
          ]
        }
      },
      {
        "id": "shot-03",
        "title": "03 — Van em movimento",
        "lead": "Prioridade B · 9V · iPhone",
        "bullets": [
          "Vidro e luz",
          "Mãos e reflexos",
          "Motor baixo",
          "Conversa distante",
          "Passagem de tempo"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Marcar deslocamento e transição.",
              "Não filmar pessoas dormindo de forma constrangedora.",
              "Se estiver escuro ou tremido, grave handles curtos e som ambiente."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sexta",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R01",
            "R02"
          ]
        }
      }
    ]
  },
  {
    "id": "s06a-assault-sabado",
    "short": "06A Assault sábado",
    "title": "06A — Montar Assault para sábado completo",
    "kicker": "Antes de sair da pousada · dia longo",
    "goal": "Sair para Igreja, Sobradinho, Pedra da Bruxa e Pirâmide com equipamento suficiente, porque o grupo não volta à pousada antes do fim da tarde/noite.",
    "items": [
      {
        "id": "s06a-01",
        "title": "Montar núcleo de imagem",
        "lead": "Câmera principal e vertical:",
        "bullets": [
          "Sony ZV-E10 com cage SmallRig, Viltrox 15mm e SD conferido",
          "Viltrox 23mm protegida para retratos/depoimentos",
          "iPhone 15 Pro Max com espaço livre e bateria alta",
          "DJI Osmo Mobile 6 se for usar movimento vertical",
          "Filtro ND principal, tampa de lente e flanela no acesso rápido"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "A Sony cobre imagem hero, retratos, textura de pedra e cenas de capa.",
              "iPhone/Osmo cobre caminhada, bastidor, transições e vertical rápido sem atrasar o grupo.",
              "Como não haverá retorno à pousada antes da Pirâmide, bateria/cartão da câmera precisam aguentar o dia inteiro."
            ]
          }
        ],
        "tags": [
          "assault",
          "sabado",
          "camera",
          "captacao"
        ],
        "critical": true
      },
      {
        "id": "s06a-02",
        "title": "Montar núcleo água e ação",
        "lead": "Sobradinho e poços:",
        "bullets": [
          "GoPro HERO 11 carregada com microSD inserido",
          "Adaptador/suporte GoPro do kit Scorp se for usar POV manual",
          "Suporte Sunnylife GoPro para Mini 4 Pro somente se for take aéreo planejado",
          "Ziplock para transporte úmido e flanela seca separada",
          "Bateria GoPro reserva e cartão microSD reserva, se estiverem no kit"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "GoPro HERO 11 assume proximidade com água, pedra molhada, POV e poços.",
              "Sony ZV-E10 não entra em zona de risco de água; fica para planos secos e seguros.",
              "O suporte Sunnylife só entra se houver intenção real de acoplar GoPro ao Mini 4 Pro. Caso contrário, fica na Defender para economizar espaço.",
              "O adaptador GoPro do kit Scorp entra apenas se for útil para POV manual, apoio rápido ou fixação simples."
            ]
          }
        ],
        "tags": [
          "assault",
          "sabado",
          "gopro",
          "captacao"
        ],
        "critical": true
      },
      {
        "id": "s06a-03",
        "title": "Montar núcleo áudio e depoimento",
        "lead": "Falas, roda e ambiente:",
        "bullets": [
          "Hollyland Lark Max 2 completo e carregado",
          "Deadcats do Lark Max 2",
          "Cabo do Lark para Sony ZV-E10",
          "Cabo do Lark para iPhone 15 Pro Max",
          "Case do Lark em bolso protegido"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "Áudio é obrigatório para orientação da equipe, roda de conversa e possíveis depoimentos.",
              "Deadcat vai junto porque há vento em pedra, mirante e Pirâmide.",
              "Cabo de câmera e cabo de celular ficam juntos para troca rápida sem desmontar a mochila."
            ]
          }
        ],
        "tags": [
          "assault",
          "sabado",
          "audio",
          "captacao"
        ],
        "critical": true
      },
      {
        "id": "s06a-04",
        "title": "Montar núcleo drone condicional",
        "lead": "Aéreo só se fizer sentido:",
        "bullets": [
          "DJI Mini 4 Pro",
          "Controle DJI RC2",
          "Baterias DJI carregadas",
          "MicroSD no drone + microSD/armazenamento do RC2 conferidos",
          "Filtros/hélices necessários em estojo",
          "Lente wide externa do Mini 4 Pro só se o take pedir campo mais aberto"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "Drone é bônus condicionado a segurança, autorização, clima, crowd e tempo.",
              "Se o uso for improvável no Sobradinho, pode ficar protegido até Pedra/Pirâmide.",
              "Não deixe drone tomar o espaço dos itens obrigatórios de câmera, áudio, GoPro, energia e frio."
            ]
          }
        ],
        "tags": [
          "assault",
          "sabado",
          "drone",
          "captacao"
        ],
        "critical": false
      },
      {
        "id": "s06a-05",
        "title": "Montar energia, dados e frio do sábado",
        "lead": "Dia inteiro fora:",
        "bullets": [
          "Baterias NP-FW50, GoPro e Lark Max 2 cheias/usadas separadas",
          "Power bank Ugreen 25.000 mAh + cabo USB-C curto",
          "Estojo de cartões com regra vazio/usado",
          "Agasalho forte ou corta-vento/capa para Pedra/Pirâmide",
          "Documento, dinheiro/cartão, chave e remédio essencial"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "O sábado atravessa manhã, água, organização das 15h, trilha, roda e pôr do sol.",
              "Frio vai na Assault ou na mão antes de sair do Sobradinho; não fica preso na Defender.",
              "Cartões usados não voltam para ciclo de gravação sem controle físico."
            ]
          }
        ],
        "tags": [
          "assault",
          "sabado",
          "energia",
          "dados"
        ],
        "critical": true
      }
    ]
  },
  {
    "id": "s07-sabado-manha-shotlist",
    "short": "07 Sábado manhã",
    "title": "07 — Shotlist: sábado manhã",
    "kicker": "Café · Igreja · Sobradinho",
    "goal": "Captar preparação, localização, gruta, água e convivência.",
    "items": [
      {
        "id": "shot-04",
        "title": "04 — Chegada e café",
        "lead": "Prioridade A · 9V-VE · Sony 15/23mm",
        "bullets": [
          "Xícara e colher",
          "Casaco e mochila",
          "Pessoas se preparando",
          "Saída pontual",
          "Som de passos"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Transformar noite em manhã e cansaço em expectativa.",
              "Focar gesto humano, não propaganda de pousada.",
              "Captar som de xícara, tecido, mochila e passos."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R02"
          ]
        }
      },
      {
        "id": "shot-05",
        "title": "05 — Igreja de Pedra",
        "lead": "Prioridade B · 9V + H-opt · Sony 15mm",
        "bullets": [
          "Pedra com grupo",
          "Rua e vento",
          "Escala humana",
          "Vertical primeiro",
          "Contexto rápido"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Localizar São Thomé sem cartão-postal vazio.",
              "Incluir participante ou grupo para dar escala.",
              "Não gastar tempo demais no bloco."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R01",
            "R03"
          ]
        }
      },
      {
        "id": "shot-06",
        "title": "06 — Caminhada urbana",
        "lead": "Prioridade B · 9V · iPhone + Osmo",
        "bullets": [
          "Passos em pedra",
          "Costas do grupo",
          "Mochilas",
          "Detalhe de rua",
          "Som de caminhada"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Criar transição urbana e sensação de deslocamento.",
              "Evitar rostos aleatórios sem contexto.",
              "Usar costas, pés, mãos e grupo."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R01",
            "R02",
            "R03"
          ]
        }
      },
      {
        "id": "shot-07",
        "title": "07 — Gruta Sobradinho",
        "lead": "Prioridade A · 9V-VE · iPhone baixa luz/Sony",
        "bullets": [
          "Entrada da gruta",
          "Silhueta",
          "Textura da rocha",
          "Eco e passos",
          "Lanterna/luz natural"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Transmitir presença, textura e mistério.",
              "Evitar takes longos escuros.",
              "Gravar som de eco, passos e respiração quando possível."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "captacao",
          "audio"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R03"
          ]
        }
      },
      {
        "id": "shot-08",
        "title": "08 — Água e poços",
        "lead": "Prioridade A · 9V-VE · GoPro + iPhone",
        "bullets": [
          "Pés na água",
          "Mãos e gotas",
          "Risos e reação",
          "Som de água",
          "Pessoa sempre no quadro"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Criar desejo sensorial e experiência real.",
              "GoPro assume proximidade com água; Sony fica segura.",
              "Evitar paisagem sem gesto."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "gopro",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R02",
            "R03"
          ]
        }
      },
      {
        "id": "shot-09",
        "title": "09 — Almoço no complexo",
        "lead": "Prioridade C · 9V · iPhone",
        "bullets": [
          "Mesa e talheres",
          "Pausa do grupo",
          "Riso natural",
          "Som ambiente",
          "Cena curta"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Registrar convivência se houver gesto humano.",
              "Não transformar em propaganda de restaurante.",
              "Cortar se o cronograma apertar."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R01",
            "R02"
          ]
        }
      }
    ]
  },
  {
    "id": "s08-sabado-tarde-shotlist",
    "short": "08 Sábado tarde",
    "title": "08 — Shotlist: sábado tarde/noite",
    "kicker": "Organização · Pedra · Roda · Pirâmide",
    "goal": "Garantir o coração emocional do projeto: cuidado, pertencimento e clímax visual.",
    "items": [
      {
        "id": "shot-10",
        "title": "10 — Organização 15h",
        "lead": "Prioridade A · 9V · iPhone + Lark",
        "bullets": [
          "Equipe chama grupo",
          "Aviso de casaco",
          "Cronograma",
          "Saída sem voltar à pousada",
          "Tom acolhedor"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Mostrar cuidado e organização, não bronca.",
              "Captar fala objetiva e gesto real.",
              "Esse bloco prova condução da Anauá."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "audio",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R04",
            "R01"
          ]
        }
      },
      {
        "id": "shot-11",
        "title": "11 — Parque Antônio Rosa",
        "lead": "Prioridade B · 9V · iPhone/Sony",
        "bullets": [
          "Trilha curta",
          "Pedra e subida",
          "Grupo caminhando",
          "Passos e vento",
          "Progressão para o alto"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Construir transição para Pedra/Pirâmide.",
              "Evitar crowd e planos sem pessoa.",
              "Usar movimento leve e vertical."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R01",
            "R03"
          ]
        }
      },
      {
        "id": "shot-12",
        "title": "12 — Pedra da Bruxa",
        "lead": "Prioridade A · 9V + H-opt · Sony 15mm",
        "bullets": [
          "Grupo contemplando",
          "Pedra e céu",
          "Vento",
          "Expressões",
          "Frame de capa"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Mostrar escala e misticismo sem pose turística.",
              "Buscar olhar, silêncio, vento e naturalidade.",
              "Manter distância segura em pedra."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R03"
          ]
        }
      },
      {
        "id": "shot-13",
        "title": "13 — Roda de conversa",
        "lead": "Prioridade A · 9V-VE · Sony 23mm + Lark",
        "bullets": [
          "Mãos e círculo",
          "Silêncio",
          "Fala sobre 1 ano",
          "Expressão do grupo",
          "Consentimento"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Captar a virada de pertencimento.",
              "Áudio limpo é obrigatório se houver fala de 1 ano.",
              "Não invadir vulnerabilidade; respeitar consentimento."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "audio",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R03",
            "R05"
          ]
        }
      },
      {
        "id": "shot-14",
        "title": "14 — Pirâmide pôr do sol",
        "lead": "Prioridade A · 9V + H-opt · iPhone/Sony/Drone condicional",
        "bullets": [
          "Grupo em contraluz",
          "Horizonte",
          "Vento",
          "Silhuetas",
          "Capa R01"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Construir o clímax visual da campanha.",
              "Preservar bateria e cartão para esse momento.",
              "Drone só se houver segurança, autorização e tempo."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "drone",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R03"
          ]
        }
      },
      {
        "id": "shot-15",
        "title": "15 — Noite livre no centro",
        "lead": "Prioridade C · 9V · iPhone discreto",
        "bullets": [
          "Luzes de loja",
          "Caminhada",
          "Grupo livre",
          "Som de rua",
          "Detalhes rápidos"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Usar apenas se houver energia, segurança e boa cena.",
              "Evitar marcas, conversas privadas e pessoas sem contexto.",
              "Funciona como respiro, não como eixo central."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "sabado",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R02"
          ]
        }
      }
    ]
  },
  {
    "id": "s09-noite-backup",
    "short": "09 Backup",
    "title": "09 — Sábado à noite: backup e remontagem",
    "kicker": "Escritório técnico em ação",
    "goal": "Proteger o material do sábado e preparar a Assault para domingo.",
    "items": [
      {
        "id": "s09-01",
        "title": "Descarregar arquivos por origem",
        "lead": "Ingest noturno:",
        "bullets": [
          "ZVE10",
          "IPHONE",
          "GOPRO",
          "DRONE",
          "AUDIO",
          "Verificar antes de formatar"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Copie por origem, não tudo em pasta genérica.",
              "Confira quantidade e tamanho dos arquivos.",
              "Cartões usados continuam preservados até cópia validada."
            ]
          }
        ],
        "tags": [
          "pousada",
          "dados"
        ],
        "critical": true
      },
      {
        "id": "s09-02",
        "title": "Registrar lacunas para domingo",
        "lead": "Controle editorial:",
        "bullets": [
          "Falta depoimento?",
          "Falta capa?",
          "Falta foley?",
          "Falta equipe?",
          "Falta natureza com pessoa?"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Revise rapidamente o que já existe para R01 a R05.",
              "Anote lacunas concretas para buscar no domingo.",
              "Essa revisão impede voltar com material bonito, mas incompleto."
            ]
          }
        ],
        "tags": [
          "pousada",
          "plano"
        ],
        "critical": true
      },
      {
        "id": "s09-03",
        "title": "Recarregar sistemas e remontar Assault",
        "lead": "Próximo dia:",
        "bullets": [
          "Sony",
          "DJI/RC2",
          "GoPro",
          "Hollyland",
          "iPhone/Osmo",
          "Power bank"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Use a estação 330W e o Baseus conforme prioridade.",
              "Deixe baterias cheias já separadas para a Assault.",
              "Acordar com mochila semi-pronta reduz esquecimento."
            ]
          }
        ],
        "tags": [
          "pousada",
          "energia",
          "assault"
        ],
        "critical": true
      }
    ]
  },
  {
    "id": "s09a-assault-domingo",
    "short": "09A Assault domingo",
    "title": "09A — Montar Assault para domingo",
    "kicker": "Antes de sair para Ladeira e Vale",
    "goal": "Remontar a mochila para água, depoimentos, gruta, tarde livre e Letreiro, já considerando retorno para Belo Horizonte.",
    "items": [
      {
        "id": "s09a-01",
        "title": "Repor câmera e vertical",
        "lead": "Imagem do segundo dia:",
        "bullets": [
          "Sony ZV-E10 com NP-FW50 cheia e SD conferido",
          "Viltrox 15mm para contexto e Viltrox 23mm para depoimentos",
          "iPhone 15 Pro Max com espaço livre",
          "DJI Osmo Mobile 6 se for usar caminhada/centrinho",
          "Filtro ND principal, tampa e flanela acessíveis"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "O domingo precisa complementar o sábado, não repetir a mesma estética.",
              "Priorize natureza com pessoa, rostos pós-experiência e cenas finais de despedida.",
              "Separe espaço no iPhone antes de sair; retorno e Letreiro ainda rendem material."
            ]
          }
        ],
        "tags": [
          "assault",
          "domingo",
          "camera",
          "captacao"
        ],
        "critical": true
      },
      {
        "id": "s09a-02",
        "title": "Repor GoPro e água",
        "lead": "Vale das Borboletas:",
        "bullets": [
          "GoPro HERO 11 carregada",
          "MicroSD da GoPro conferido",
          "Adaptador/suporte GoPro do kit Scorp se for usar POV manual",
          "Ziplock para retorno úmido",
          "Flanela seca dedicada à GoPro"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "Vale das Borboletas e poços pedem GoPro HERO 11 como câmera de risco.",
              "Grave água com gesto humano: mãos, pés, entrada/saída, reação e textura.",
              "GoPro deve voltar seca antes de entrar na van; se estiver úmida, vai no ziplock separado."
            ]
          }
        ],
        "tags": [
          "assault",
          "domingo",
          "gopro",
          "captacao"
        ],
        "critical": true
      },
      {
        "id": "s09a-03",
        "title": "Repor áudio para depoimentos",
        "lead": "Prova social:",
        "bullets": [
          "Hollyland Lark Max 2 carregado",
          "Deadcats do Lark Max 2",
          "Cabo para Sony ZV-E10",
          "Cabo para iPhone 15 Pro Max",
          "Perguntas curtas de depoimento anotadas"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "Domingo é o melhor momento para depoimento porque a pessoa já viveu a experiência.",
              "Busque frases específicas: momento marcante, diferença da Anauá e lembrança principal.",
              "Se áudio ou fala estiverem fracos, não force Reel de depoimento."
            ]
          }
        ],
        "tags": [
          "assault",
          "domingo",
          "audio",
          "depoimento"
        ],
        "critical": true
      },
      {
        "id": "s09a-04",
        "title": "Decidir drone e acessórios opcionais",
        "lead": "Uso controlado:",
        "bullets": [
          "DJI Mini 4 Pro + DJI RC2 somente se houver uso real",
          "Baterias DJI carregadas",
          "MicroSD do drone conferido",
          "Lente wide externa Mini 4 Pro só se planejada",
          "Suporte Sunnylife GoPro para Mini 4 Pro só se planejado",
          "Sem acessório criativo que não tenha take definido"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "Drone no domingo precisa ter função clara: Vale, contexto de cidade ou Letreiro.",
              "Se o tempo estiver curto, preserve energia para depoimentos, água e despedida.",
              "Acessório opcional só vai se for seguro, testado e útil para o take."
            ]
          }
        ],
        "tags": [
          "assault",
          "domingo",
          "drone"
        ],
        "critical": false
      },
      {
        "id": "s09a-05",
        "title": "Fechar retorno e controle pessoal",
        "lead": "Depois do Letreiro volta BH:",
        "bullets": [
          "Power bank Ugreen 25.000 mAh + cabos curtos",
          "Documento, dinheiro/cartão e chave no bolso frontal fixo",
          "Cartões usados separados no estojo",
          "Roupa molhada isolada em saco próprio, se houver",
          "Remédio essencial, ziplock e flanela de campo"
        ],
        "details": [
          {
            "title": "Critério",
            "items": [
              "Domingo termina com retorno direto. O fechamento começa antes de sair da pousada.",
              "Evite misturar cartão usado com bolso de roupa ou nécessaire.",
              "Itens pessoais precisam estar no mesmo bolso para embarque final."
            ]
          }
        ],
        "tags": [
          "assault",
          "domingo",
          "controle",
          "dados"
        ],
        "critical": true
      }
    ]
  },
  {
    "id": "s10-domingo-shotlist",
    "short": "10 Domingo",
    "title": "10 — Shotlist: domingo manhã e tarde",
    "kicker": "Vale · depoimentos · despedida",
    "goal": "Fechar a história com segunda natureza, prova social e imagem final.",
    "items": [
      {
        "id": "shot-16",
        "title": "16 — Ladeira do Amendoim",
        "lead": "Prioridade B · 9V · iPhone/GoPro",
        "bullets": [
          "Reação do grupo",
          "Explicação breve",
          "Segurança",
          "Cena curta",
          "Sem alongar"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Registrar curiosidade do roteiro sem virar pegadinha.",
              "Fazer rápido e seguro.",
              "Não gastar tempo demais."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R01",
            "R03"
          ]
        }
      },
      {
        "id": "shot-17",
        "title": "17 — Vale das Borboletas",
        "lead": "Prioridade A · 9V-VE · GoPro/iPhone/Sony",
        "bullets": [
          "Água e trilha",
          "Poços",
          "Rosto pós-banho",
          "Silêncio",
          "Som de água"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Criar segundo eixo de natureza/água.",
              "Diferenciar do sábado: calma, detalhe, textura e intimidade.",
              "Manter pessoa no quadro."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "gopro",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R02",
            "R03"
          ]
        }
      },
      {
        "id": "shot-18",
        "title": "18 — Poço dos Gnomos/Maria Ribeiro",
        "lead": "Prioridade B · 9V · GoPro/iPhone",
        "bullets": [
          "Mãos na água",
          "Grupo entrando/saindo",
          "Pedras",
          "Água próxima",
          "Reação curta"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Gerar variação sensorial dentro do Vale.",
              "Inserir participante, gesto ou reação.",
              "Evitar plano bonito sem história."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R03"
          ]
        }
      },
      {
        "id": "shot-19",
        "title": "19 — Gruta de São Thomé",
        "lead": "Prioridade B · 9V · iPhone/Sony",
        "bullets": [
          "Silhueta",
          "Textura da pedra",
          "Entrada",
          "Eco",
          "Ambiente curto"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Registrar memória histórica/espiritual sem didatismo.",
              "Usar takes curtos se houver baixa luz ou crowd.",
              "Priorizar textura e presença."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R01",
            "R03"
          ]
        }
      },
      {
        "id": "shot-20",
        "title": "20 — Tarde livre",
        "lead": "Prioridade C · 9V · iPhone",
        "bullets": [
          "Compras",
          "Banco/descanso",
          "Grupo livre",
          "Detalhes de cidade",
          "Sem áudio privado"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Registrar autonomia e descanso se houver gesto humano.",
              "Usar como respiro narrativo.",
              "Evitar marcas e pessoas em situação privada."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R02",
            "R04"
          ]
        }
      },
      {
        "id": "shot-21",
        "title": "21 — Tirolesa opcional",
        "lead": "Prioridade C · 9V · GoPro/iPhone",
        "bullets": [
          "Reação",
          "Vento",
          "Escala",
          "Somente se ocorrer",
          "Sem vender como incluso"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Adicionar energia se a atividade acontecer.",
              "Conferir segurança e autorização.",
              "Não tratar como item obrigatório do roteiro."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "captacao"
        ],
        "critical": false,
        "meta": {
          "uses": [
            "R03"
          ]
        }
      },
      {
        "id": "shot-22",
        "title": "22 — Letreiro despedida",
        "lead": "Prioridade A · 9V + H-opt · Sony/iPhone + Lark",
        "bullets": [
          "Grupo no Letreiro",
          "Abraço/despedida",
          "Fala final",
          "Última luz",
          "Porta da van"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Construir fechamento comercial e emocional.",
              "Captar gesto real e uma frase específica.",
              "A cena deve comunicar desejo de próxima viagem."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "audio",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R02",
            "R05"
          ]
        }
      },
      {
        "id": "shot-23",
        "title": "23 — Depoimento expectativa",
        "lead": "Prioridade A · 9V-VE · Sony 23mm/iPhone + Lark",
        "bullets": [
          "O que você espera?",
          "Resposta concreta",
          "Sombra aberta",
          "Áudio limpo",
          "15–30 segundos"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Criar antes/depois do participante.",
              "Pedir uma sensação concreta.",
              "Evitar resposta genérica."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "audio",
          "depoimento"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R05",
            "R02"
          ]
        }
      },
      {
        "id": "shot-24",
        "title": "24 — Depoimento momento marcante",
        "lead": "Prioridade A · 9V-VE · Sony 23mm + Lark",
        "bullets": [
          "Qual cena você vai lembrar?",
          "Resposta curta",
          "Frase específica",
          "Áudio limpo",
          "Consentimento"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Gerar prova social emocional.",
              "Buscar frase específica, não relato longo.",
              "Só usar se a fala for forte e o áudio estiver bom."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "audio",
          "depoimento"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R05"
          ]
        }
      },
      {
        "id": "shot-25",
        "title": "25 — B-roll de equipe",
        "lead": "Prioridade A · 9V · iPhone/Sony",
        "bullets": [
          "Checklist",
          "Água/horários",
          "Grupo e microfone",
          "Recados",
          "Confiança sem pose"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Mostrar cuidado invisível e organização real.",
              "Não expor dados, documentos ou telas sensíveis.",
              "Captar gesto, não autopromoção."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R04",
            "R01"
          ]
        }
      },
      {
        "id": "shot-26",
        "title": "26 — Foleys essenciais",
        "lead": "Prioridade A · Todos · Lark/iPhone",
        "bullets": [
          "Porta da van",
          "Passos",
          "Mochila",
          "Água",
          "Vento",
          "Gruta",
          "Xícara",
          "Zíper e silêncio"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Gravar 10 segundos limpos de cada som quando possível.",
              "Som real é a cola dos Reels.",
              "Não usar conversa privada como foley."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "audio",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "Todos"
          ]
        }
      },
      {
        "id": "shot-27",
        "title": "27 — Frames de capa",
        "lead": "Prioridade A · 9V + foto · Sony/iPhone",
        "bullets": [
          "3 capas por Reel",
          "Pessoa + paisagem",
          "Grupo",
          "Equipe em ação",
          "Espaço limpo para texto"
        ],
        "details": [
          {
            "title": "Execução",
            "items": [
              "Garantir material de capa e thumbnail.",
              "Fazer versões com grupo, participante, paisagem com pessoa e equipe.",
              "Evitar capa poluída ou paisagem sem presença humana."
            ]
          }
        ],
        "tags": [
          "shotlist",
          "domingo",
          "capas",
          "captacao"
        ],
        "critical": true,
        "meta": {
          "uses": [
            "R01",
            "R02",
            "R03",
            "R04",
            "R05"
          ]
        }
      }
    ]
  },
  {
    "id": "s11-fechamento",
    "short": "11 Fechamento",
    "title": "11 — Fechamento geral: inventário completo",
    "kicker": "Nada fica para trás",
    "goal": "Conferir fisicamente tudo que entrou na Defender, na Assault e no escritório técnico da pousada.",
    "items": [
      {
        "id": "s11-01",
        "title": "Varredura física do quarto",
        "lead": "Olhar e tocar antes de sair:",
        "bullets": [
          "Tomadas, extensões e adaptadores",
          "Mesa técnica e área do MacBook",
          "Banheiro e bancada da pia",
          "Cama, chão, cantos e embaixo da cama",
          "Janela, armário, cabide e varal improvisado",
          "Lixo, sacos e roupa molhada"
        ],
        "details": [
          {
            "title": "Procedimento",
            "items": [
              "Faça a varredura em sentido único: porta, tomadas, mesa, cama, chão, banheiro, janela e armário.",
              "Não marque por memória. Cabos, cartões, pendrives, flanelas, deadcats e adaptadores pequenos são os itens que mais ficam para trás.",
              "Depois da varredura, feche a Defender e a Assault e não reabra sem necessidade."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "pousada"
        ],
        "critical": true
      },
      {
        "id": "s11-02",
        "title": "Defender — roupas, frio e higiene",
        "lead": "Espelho da montagem da Defender:",
        "bullets": [
          "3 camisetas leves: sábado, domingo e 1 reserva",
          "1 calça confortável para noite/frio",
          "1 bermuda ou peça leve para deslocamento",
          "1 pijama leve",
          "1 sunga ou roupa de banho",
          "3 cuecas: 2 dias + 1 reserva",
          "3 pares de meia: 2 dias + 1 reserva",
          "1 chinelo e 1 calçado confortável para pedra/trilha",
          "1 agasalho forte + 1 corta-vento/capa de chuva",
          "1 toalha + nécessaire isolada",
          "Sacos separados para roupa suja, roupa molhada e lixo"
        ],
        "details": [
          {
            "title": "Conferência",
            "items": [
              "Roupa molhada precisa voltar isolada e longe da base técnica.",
              "Nécessaire e líquidos devem estar fechados e separados de MacBook, cartões, lentes, microfones e carregadores.",
              "Confirme banheiro, cama, varal improvisado e sacolas externas antes de fechar a Defender."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "defender",
          "roupas"
        ],
        "critical": true
      },
      {
        "id": "s11-03",
        "title": "Defender — energia, baterias e cabos",
        "lead": "Espelho da estação técnica de baterias:",
        "bullets": [
          "Fonte original Apple + cabo USB-C para MagSafe 3",
          "Baseus 140W com cabos usados em Ugreen, iPhone e GoPro",
          "Estação 330W AS330W com cabos usados em drone, RC2, Sony, áudio, Osmo e luzes",
          "4 cabos USB-C USB4 240W/40Gbps",
          "Power bank Ugreen 25.000 mAh",
          "Hub DJI Mini 4 Pro e baterias",
          "DJI RC2",
          "Carregador/caixa NP-FW50 da ZV-E10",
          "Hollyland Lark Max 2",
          "DJI Osmo Mobile 6",
          "GoPro HERO 11",
          "Ulanzi VL120, fill light, Kica JetFan e fan ZV-E10",
          "Velcros/elásticos e cabos leves"
        ],
        "details": [
          {
            "title": "Conferência",
            "items": [
              "Fonte Apple e MagSafe voltam juntos no setor do MacBook.",
              "Baseus volta com cabos usados no Ugreen, iPhone e GoPro.",
              "Estação 330W volta com os cabos do setor audiovisual.",
              "Confira os itens pequenos: deadcats, cabos USB-C curtos, cabos USB-A, adaptadores e flanelas.",
              "Nenhum cabo, fonte ou bateria fica em tomada, chão, cama ou atrás da mesa."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "defender",
          "energia"
        ],
        "critical": true
      },
      {
        "id": "s11-04",
        "title": "Defender — dados, cartões e backup",
        "lead": "Espelho do núcleo de ingest:",
        "bullets": [
          "MacBook Pro M5 em sleeve",
          "Leitor Ugreen USB-C SD + TF",
          "SD SanDisk Extreme Pro 256GB V30 200MB/s da ZV-E10",
          "2 microSD SanDisk Extreme Pro 256GB V30",
          "2 pendrives SanDisk Ultra Dual Drive Go 64GB",
          "Estojo de cartões com usados/vazios separados",
          "Pastas ZVE10, IPHONE, GOPRO, DRONE, AUDIO, SELECTS, DAVINCI e EXPORTS"
        ],
        "details": [
          {
            "title": "Conferência",
            "items": [
              "Nenhum cartão pode voltar solto na mochila.",
              "Cartões usados devem permanecer preservados até dupla cópia em casa.",
              "Pendrives e leitor ficam junto ao MacBook, não no bolso de energia."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "defender",
          "dados"
        ],
        "critical": true
      },
      {
        "id": "s11-05",
        "title": "Defender — estabilização, luz e suporte",
        "lead": "Espelho dos acessórios grandes:",
        "bullets": [
          "Scorp Mini 3 Pro com case",
          "Tripod, slider, fixed plate e quick release plate do Scorp",
          "Extension pole, articulating arm e smartphone holder do Scorp",
          "Fill light do kit Scorp",
          "Cabos, parafusos, Allen key, dust cover e adaptador GoPro do kit Scorp",
          "Ulanzi MT-44",
          "Ulanzi MT-08",
          "Ulanzi VL120 RGB 2500K–9000K"
        ],
        "details": [
          {
            "title": "Conferência",
            "items": [
              "Peças pequenas do Scorp devem voltar ao case correto.",
              "MT-44, MT-08 e VL120 não devem ficar soltos em saco de roupa.",
              "Se algum acessório foi usado no quarto, confira mesa, cama e tomada."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "defender",
          "estabilizacao",
          "iluminacao"
        ],
        "critical": true
      },
      {
        "id": "s11-06",
        "title": "Defender — manutenção e acessórios condicionais",
        "lead": "Espelho da manutenção:",
        "bullets": [
          "Kica JetFan",
          "Ventilador de refrigeração da ZV-E10",
          "Dummy battery USB-C da ZV-E10",
          "Flanelas, lens pen, sílica, ziplocks e presilhas",
          "Case rígido do DJI Mini 4 Pro",
          "Lente wide externa do DJI Mini 4 Pro",
          "Suporte Sunnylife GoPro para DJI Mini 4 Pro"
        ],
        "details": [
          {
            "title": "Conferência",
            "items": [
              "Itens de manutenção voltam secos e isolados.",
              "Acessórios condicionais do drone voltam para o setor do drone, não para bolsos frontais.",
              "Não guarde flanela molhada com lente, filtro, cartão ou microfone."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "defender",
          "manutencao",
          "drone"
        ],
        "critical": true
      },
      {
        "id": "s11-07",
        "title": "Assault — Sony ZV-E10 e óptica",
        "lead": "Espelho do núcleo de imagem:",
        "bullets": [
          "Sony ZV-E10",
          "Cage SmallRig com empunhadura",
          "Viltrox 15mm montada/protegida",
          "Viltrox 23mm protegida",
          "SD SanDisk Extreme Pro 256GB V30 na câmera ou estojo",
          "Filtro ND principal e filtros usados",
          "Tampas de lente/corpo",
          "Bateria NP-FW50 da câmera + reservas separadas"
        ],
        "details": [
          {
            "title": "Conferência",
            "items": [
              "Confira câmera, cartão, bateria, tampa de lente, tampa traseira e filtros.",
              "Lentes não devem viajar sem tampa ou soltas no bolso externo.",
              "Se a ZV-E10 foi usada com fan/dummy, confira se tudo voltou para o setor correto."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "assault",
          "camera"
        ],
        "critical": true
      },
      {
        "id": "s11-08",
        "title": "Assault — áudio e captação móvel",
        "lead": "Espelho do núcleo de som e vertical:",
        "bullets": [
          "Hollyland Lark Max 2 completo e carregado",
          "Deadcats do Lark Max 2",
          "Cabo do Lark para Sony ZV-E10",
          "Cabo do Lark para iPhone 15 Pro Max",
          "Case do Lark Max 2",
          "iPhone 15 Pro Max",
          "DJI Osmo Mobile 6"
        ],
        "details": [
          {
            "title": "Conferência",
            "items": [
              "Transmissores, receiver, deadcats e cabos precisam voltar ao case correto.",
              "Deadcat pequeno é fácil de perder; confira antes de fechar.",
              "iPhone e Osmo voltam para recarga antes de armazenamento final."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "assault",
          "audio",
          "camera"
        ],
        "critical": true
      },
      {
        "id": "s11-09",
        "title": "Assault — GoPro e água/ação",
        "lead": "Espelho do núcleo de risco:",
        "bullets": [
          "GoPro HERO 11",
          "MicroSD da GoPro conferido",
          "Bateria GoPro cheia/usada separada",
          "Adaptador/suporte GoPro do kit Scorp se saiu a campo",
          "Ziplock para retorno úmido",
          "Flanela seca dedicada à GoPro"
        ],
        "details": [
          {
            "title": "Conferência",
            "items": [
              "GoPro deve voltar seca antes de entrar na van; se estiver úmida, vai em ziplock separado.",
              "Confira microSD antes de desmontar a bolsa.",
              "Suporte/adaptador pequeno não deve ficar perdido em bolso de roupa."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "assault",
          "gopro"
        ],
        "critical": true
      },
      {
        "id": "s11-10",
        "title": "Assault — drone e controle aéreo",
        "lead": "Espelho do núcleo DJI:",
        "bullets": [
          "DJI Mini 4 Pro",
          "Controle DJI RC2",
          "Baterias DJI carregadas/usadas separadas",
          "MicroSD do drone + microSD/armazenamento do RC2 conferidos",
          "Filtros/hélices necessários em estojo",
          "Lente wide externa do Mini 4 Pro se saiu a campo",
          "Suporte Sunnylife GoPro para Mini 4 Pro se saiu a campo"
        ],
        "details": [
          {
            "title": "Conferência",
            "items": [
              "Drone não está completo sem RC2, baterias e microSD.",
              "Confira gimbal, protetor, hélices e cartões antes de fechar.",
              "Se lente wide ou suporte Sunnylife foram usados, volte com eles no setor de drone."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "assault",
          "drone"
        ],
        "critical": true
      },
      {
        "id": "s11-11",
        "title": "Assault — energia de campo e controle pessoal",
        "lead": "Espelho dos bolsos rápidos:",
        "bullets": [
          "Power bank Ugreen 25.000 mAh + cabo USB-C curto",
          "Cabos curtos de campo",
          "Estojo de cartões com regra vazio/usado",
          "Documento com foto",
          "Dinheiro/cartão e chave",
          "Remédio essencial",
          "Ziplock e flanela de campo",
          "Agasalho forte ou corta-vento/capa quando sair para Pedra/Pirâmide"
        ],
        "details": [
          {
            "title": "Conferência",
            "items": [
              "Documento, dinheiro e chave devem voltar para o mesmo bolso definido no início.",
              "Power bank e cabos curtos voltam para recarga antes do armazenamento.",
              "Frio usado na saída da tarde não pode ficar fora da Defender no retorno."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "assault",
          "controle",
          "energia"
        ],
        "critical": true
      },
      {
        "id": "s11-12",
        "title": "Mídia e backup final em casa",
        "lead": "Antes de formatar qualquer cartão:",
        "bullets": [
          "Backup do MacBook conferido",
          "Segunda cópia em armazenamento principal",
          "Pastas ZVE10/IPHONE/GOPRO/DRONE/AUDIO organizadas",
          "Cartões usados preservados",
          "Pendrives conferidos",
          "Nada formatado antes da dupla cópia"
        ],
        "details": [
          {
            "title": "Regra final",
            "items": [
              "Nenhum cartão importante deve ser formatado antes de dupla cópia segura.",
              "Ao chegar em casa, copie tudo para armazenamento principal e, se possível, segunda mídia.",
              "Só depois os cartões voltam ao ciclo de uso."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "dados"
        ],
        "critical": true
      },
      {
        "id": "s11-13",
        "title": "Pós-produção e entrega",
        "lead": "DaVinci e Reels:",
        "bullets": [
          "R01 Manifesto",
          "R02 Participante",
          "R03 Natureza",
          "R04 Bastidores/equipe",
          "R05 Depoimentos se forte",
          "Selects, capas, foleys e timeline DaVinci"
        ],
        "details": [
          {
            "title": "Primeira montagem",
            "items": [
              "Comece pelo Manifesto cronológico: embarque, estrada, café, destino, água/gruta, cuidado, roda/pôr do sol e despedida.",
              "Depois derive cortes específicos por eixo.",
              "R05 só deve existir se houver fala específica e áudio limpo."
            ]
          }
        ],
        "tags": [
          "fechamento",
          "plano",
          "dados"
        ],
        "critical": true
      }
    ]
  }
];

const baseFilters = [
  ['all', 'Tudo', 'ph:squares-four-bold'],
  ['active', 'Agora', 'ph:target-bold']
];

const state = { checked: {}, filter: 'all', query: '', hideDone: true, openSections: [], expanded: {}, controlsVisible: false };
const $ = selector => document.querySelector(selector);
const els = {
  sections: $('#sectionsContainer'), sectionTpl: $('#sectionTemplate'), itemTpl: $('#itemTemplate'),
  filters: $('#filters'), filterPrev: $('#filterPrev'), filterNext: $('#filterNext'),
  searchPanel: $('#searchPanel'), searchToggle: $('#searchToggle'), searchInput: $('#searchInput'), searchClear: $('#searchClear'),
  more: $('#moreMenu'), moreToggle: $('#moreToggle'), markVisible: $('#markVisibleBtn'), clearVisible: $('#clearVisibleBtn'),
  markAll: $('#markAllBtn'), clearAll: $('#clearAllBtn'), exportBtn: $('#exportBtn'), reset: $('#resetBtn'), toggleControls: $('#toggleControlsBtn'),
  stats: $('#quickStats'), ring: $('#progressRing'), percent: $('#progressPercent'), progressTitle: $('#progressTitle'), progressSubtitle: $('#progressSubtitle'), scoreMini: $('#scoreMini'),
  visible: $('#visibleCount'), hideDone: $('#hideDoneBtn'), expandAll: $('#expandAllBtn'), collapseAll: $('#collapseAllBtn'), backTop: $('#backTop'), cloudStatus: $('#cloudStatus'), powerModal: $('#powerModal'), powerModalPanel: $('.power-modal__panel'), powerModalBackdrop: $('#powerModalBackdrop'), powerModalClose: $('#powerModalClose'), powerModalPrint: $('#powerModalPrint'), powerModalDiagram: $('#powerModalDiagram')
};

const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
const normalize = value => String(value ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

function sectionItems(section) { return section.items.map(item => ({ ...item, sectionId: section.id, sectionTitle: section.title, sectionKicker: section.kicker })); }
function allItems() { return checklist.flatMap(section => sectionItems(section)); }
function bulletId(itemId, index) { return `${itemId}__b${index}`; }
function bulletUnits(item) { return (item.bullets || []).map((text, index) => ({ id: bulletId(item.id, index), parentId: item.id, text, critical: item.critical, sectionId: item.sectionId, tags: item.tags || [] })); }
function sectionBulletUnits(section) { return sectionItems(section).flatMap(item => bulletUnits(item)); }
function allBulletUnits() { return allItems().flatMap(item => bulletUnits(item)); }
function isDone(id) { return !!state.checked[id]; }
function itemDone(item) { const units = bulletUnits(item); return units.length ? units.every(unit => isDone(unit.id)) : isDone(item.id); }
function syncItemCompletion(item) {
  const units = bulletUnits(item);
  if (!units.length) return isDone(item.id);
  const done = units.every(unit => isDone(unit.id));
  if (done) state.checked[item.id] = true;
  else delete state.checked[item.id];
  return done;
}
function syncAllCardCompletion() { allItems().forEach(item => syncItemCompletion(item)); }
function sectionDone(section) { const required = sectionBulletUnits(section).filter(unit => unit.critical); return required.length > 0 && required.every(unit => isDone(unit.id)); }
function sectionProgress(section) { const required = sectionBulletUnits(section).filter(unit => unit.critical); const done = required.filter(unit => isDone(unit.id)).length; return { done, total: required.length, pct: required.length ? Math.round(done / required.length * 100) : 0 }; }
function firstIncompleteSection() { return checklist.find(section => !sectionDone(section)) || null; }

function normalizeTimestamp(value) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const parsed = Date.parse(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
}

function checkedCountFrom(payload) {
  if (!payload || !payload.checked || typeof payload.checked !== 'object') return 0;
  return Object.values(payload.checked).filter(Boolean).length;
}

function hasUsefulProgress(payload) {
  return checkedCountFrom(payload) > 0;
}

function optionIntentCountFrom(payload) {
  if (!payload || typeof payload !== 'object') return 0;
  let count = 0;
  if (payload.hideDone === false) count += 1;
  if (payload.controlsVisible === true) count += 1;
  if (Array.isArray(payload.openSections) && payload.openSections.length > 1) count += 1;
  if (payload.expanded && typeof payload.expanded === 'object' && Object.values(payload.expanded).some(Boolean)) count += 1;
  return count;
}

function hasUsefulState(payload) {
  return checkedCountFrom(payload) > 0 || optionIntentCountFrom(payload) > 0;
}

function remoteShouldApply(remote, local) {
  if (!remote) return false;

  const remoteTime = normalizeTimestamp(remote.updatedAt);
  const localTime = normalizeTimestamp(local.updatedAt);
  const remoteReset = normalizeTimestamp(remote.forceResetAt || 0);
  const localReset = normalizeTimestamp(local.forceResetAt || 0);

  if (remoteReset > localReset) return true;
  if (localReset > remoteReset) return false;

  if (!hasUsefulState(local) && hasUsefulState(remote)) return true;
  if (hasUsefulState(local) && !hasUsefulState(remote)) return false;

  return remoteTime >= localTime;
}

function getPersistedState({ touch = true } = {}) {
  const previous = readStoredState();
  return {
    version: APP_VERSION,
    updatedAt: touch ? Date.now() : normalizeTimestamp(previous.updatedAt || Date.now()),
    checked: state.checked || {},
    filter: state.filter || 'all',
    query: state.query || '',
    hideDone: state.hideDone !== false,
    openSections: Array.isArray(state.openSections) ? state.openSections : [],
    expanded: state.expanded || {},
    controlsVisible: state.controlsVisible === true
  };
}

function readStoredState() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
  } catch {
    return {};
  }
}

function persistLocal(payload) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    version: APP_VERSION,
    ...payload,
    updatedAt: normalizeTimestamp(payload.updatedAt || Date.now())
  }));
}

function applyPersistedState(saved, { keepView = false } = {}) {
  if (!saved || typeof saved !== 'object') return;
  state.checked = saved.checked || {};
  state.filter = keepView ? (state.filter || 'all') : (saved.filter || 'all');
  state.query = keepView ? (state.query || '') : (saved.query || '');
  state.hideDone = saved.version >= APP_VERSION ? saved.hideDone !== false : true;
  state.openSections = Array.isArray(saved.openSections) ? saved.openSections : [];
  state.expanded = saved.expanded || {};
  state.controlsVisible = saved.version >= APP_VERSION ? saved.controlsVisible === true : false;
  syncAllCardCompletion();
}

function load() {
  try {
    applyPersistedState(readStoredState());
  } catch {}
}

function updateCloudStatus(status, label) {
  if (!els.cloudStatus) return;
  const map = {
    local: ['ph:hard-drives-bold', 'Local'],
    connecting: ['ph:cloud-arrow-up-bold', 'Conectando'],
    empty: ['ph:cloud-arrow-up-bold', 'Criando nuvem'],
    syncing: ['ph:cloud-arrow-up-bold', 'Sincronizando'],
    synced: ['ph:cloud-check-bold', 'Nuvem ativa'],
    error: ['ph:cloud-warning-bold', 'Falha']
  };
  const [icon, text] = map[status] || map.local;
  els.cloudStatus.dataset.status = status;
  els.cloudStatus.innerHTML = `<iconify-icon icon="${icon}"></iconify-icon><b>${label || text}</b>`;
}

function save(options = {}) {
  const payload = getPersistedState();
  if (options.forceReset) payload.forceResetAt = Date.now();
  persistLocal(payload);
  if (window.ChecklistCloud) {
    updateCloudStatus('syncing');
    window.ChecklistCloud.push(payload, { forceReset: options.forceReset === true });
  } else {
    updateCloudStatus('local');
  }
}

function applyRemoteState(remote) {
  const local = readStoredState();
  const remoteTime = normalizeTimestamp(remote?.updatedAt);
  if (!remoteShouldApply(remote, local)) return;
  applyPersistedState(remote, { keepView: false });
  persistLocal({ ...remote, updatedAt: remoteTime || Date.now() });
  if (state.query) els.searchPanel.classList.add('is-open');
  else els.searchPanel.classList.remove('is-open');
  if (!state.openSections.length) state.openSections = [firstIncompleteSection()?.id].filter(Boolean);
  render();
  syncPowerRoute();
}

function pushLocalStateToCloud() {
  const local = readStoredState();
  const payload = local && Object.keys(local).length > 0 ? local : getPersistedState();
  if (!hasUsefulState(payload)) {
    updateCloudStatus('synced', 'Nuvem pronta');
    return;
  }
  if (window.ChecklistCloud) window.ChecklistCloud.push({ ...payload, updatedAt: normalizeTimestamp(payload.updatedAt) || Date.now() }, { forceReset: false });
}

function initCloudSync() {
  if (!window.ChecklistCloud || initCloudSync.started) return false;
  initCloudSync.started = true;
  updateCloudStatus('connecting');
  window.ChecklistCloud.init({
    getLocalState: readStoredState,
    applyRemoteState,
    pushIfRemoteEmpty: pushLocalStateToCloud,
    onStatus: updateCloudStatus
  });
  return true;
}
window.addEventListener('checklist-cloud-ready', initCloudSync);

function matchesQuery(item) {
  if (!state.query.trim()) return true;
  const text = `${item.title} ${item.lead} ${(item.bullets || []).join(' ')} ${(item.details || []).map(block => `${block.title} ${(block.items || []).join(' ')}`).join(' ')} ${item.sectionTitle} ${item.sectionKicker}`;
  return normalize(text).includes(normalize(state.query));
}
function filterAllowsSection(section) {
  if (state.filter === 'all') return true;
  if (state.filter === 'active') return firstIncompleteSection()?.id === section.id;
  return state.filter === section.id;
}
function getVisibleItems() {
  const items = [];
  checklist.forEach(section => {
    if (!filterAllowsSection(section)) return;
    sectionItems(section).forEach(item => {
      if (!matchesQuery(item)) return;
      if (state.hideDone && itemDone(item)) return;
      items.push(item);
    });
  });
  return items;
}
function ensureAutoOpen() {
  const active = firstIncompleteSection();
  if (!active) return;
  if (!state.openSections.length || state.filter === 'active') state.openSections = [active.id];
  if (!state.openSections.includes(active.id)) state.openSections.unshift(active.id);
}

function iconForSection(section) {
  const key = normalize(`${section.title} ${section.kicker}`);
  if (key.includes('defender')) return 'ph:warehouse-bold';
  if (key.includes('assault')) return 'ph:backpack-bold';
  if (key.includes('pousada')) return 'ph:house-line-bold';
  if (key.includes('sexta')) return 'ph:moon-stars-bold';
  if (key.includes('sabado') || key.includes('sábado')) return 'ph:sun-horizon-bold';
  if (key.includes('domingo')) return 'ph:sun-bold';
  if (key.includes('shotlist')) return 'ph:film-strip-bold';
  if (key.includes('plano')) return 'ph:map-trifold-bold';
  if (key.includes('fechamento')) return 'ph:flag-checkered-bold';
  return 'ph:list-checks-bold';
}
function filterIcon(section) { return iconForSection(section); }


function applyControlsVisibility() {
  document.body.classList.toggle('controls-hidden', state.controlsVisible === false);
  if (els.toggleControls) {
    els.toggleControls.innerHTML = state.controlsVisible === false
      ? '<iconify-icon icon="ph:sliders-horizontal-bold"></iconify-icon> Mostrar controles'
      : '<iconify-icon icon="ph:sliders-horizontal-bold"></iconify-icon> Ocultar controles';
  }
}

function renderFilters() {
  els.filters.innerHTML = '';
  const filters = [...baseFilters, ...checklist.map(section => [section.id, section.short || section.title, filterIcon(section)])];
  filters.forEach(([id, label, icon]) => {
    const count = id === 'all' ? checklist.length : id === 'active' ? (firstIncompleteSection() ? 1 : 0) : 1;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `chip ${state.filter === id ? 'is-active' : ''}`;
    btn.innerHTML = `<iconify-icon icon="${icon}"></iconify-icon><span>${esc(label)}</span><small>${count}</small>`;
    btn.addEventListener('click', () => { state.filter = id; if (id !== 'all') state.openSections = [id === 'active' ? firstIncompleteSection()?.id : id].filter(Boolean); save(); render(); });
    els.filters.appendChild(btn);
  });
}

function renderStats() {
  const units = allBulletUnits();
  const req = units.filter(unit => unit.critical);
  const reqPending = req.filter(unit => !isDone(unit.id)).length;
  const cards = allItems();
  const active = firstIncompleteSection();
  const activeNumber = active ? (active.title.match(/^(\d+[A-Z]?)/)?.[1] || 'Atual') : 'Fim';
  const activeTitle = active ? active.title.replace(/^\d+[A-Z]?\s*—\s*/, '').trim() : 'Checklist concluído';
  const activeKicker = active ? active.kicker : 'Todas as etapas foram concluídas';
  const shotlistBlocks = checklist.filter(section => normalize(section.title).includes('shotlist')).length;

  els.stats.innerHTML = `
    <div class="stat stat--primary">
      <div class="stat__head"><iconify-icon icon="ph:target-bold"></iconify-icon><span>Próxima etapa</span></div>
      <strong class="stat__value stat__value--step">${esc(activeNumber)}</strong>
      <span class="stat__title">${esc(activeTitle)}</span>
      <small>${esc(activeKicker || 'Próximo bloco operacional')}</small>
    </div>
    <div class="stat">
      <div class="stat__head"><iconify-icon icon="ph:warning-diamond-bold"></iconify-icon><span>Obrigatórios</span></div>
      <strong class="stat__value">${reqPending}</strong>
      <span class="stat__title">pendentes</span>
      <small>${req.length} itens críticos no total</small>
    </div>
    <div class="stat">
      <div class="stat__head"><iconify-icon icon="ph:cards-three-bold"></iconify-icon><span>Checklist</span></div>
      <strong class="stat__value">${cards.length}</strong>
      <span class="stat__title">cards principais</span>
      <small>${checklist.length} seções operacionais</small>
    </div>
    <div class="stat">
      <div class="stat__head"><iconify-icon icon="ph:film-strip-bold"></iconify-icon><span>Shotlist</span></div>
      <strong class="stat__value">${shotlistBlocks}</strong>
      <span class="stat__title">blocos</span>
      <small>linha do tempo da captação</small>
    </div>`;
}
function renderLead(item) {
  const match = /^Prioridade\s+([ABC])\s*·\s*([^·]+)\s*·\s*(.+)$/.exec(item.lead || '');
  if (!match) return `<span class="summary-lead">${esc(item.lead)}</span>`;
  const priority = match[1];
  const code = match[2].trim();
  const equipment = match[3].trim();
  return `<span class="lead-meta">
    <span class="priority-pill priority-${priority.toLowerCase()}">${priority}</span>
    <span class="code-pill">${esc(code)}</span>
    <span class="equipment-text">${esc(equipment)}</span>
  </span>`;
}

function renderSummary(item) {
  const uses = item.meta?.uses || [];
  const usesHtml = uses.length ? `<span class="use-pills">${uses.map(u => `<em>${esc(u)}</em>`).join('')}</span>` : '';
  return `<span class="summary-block">${renderLead(item)}${usesHtml}<ul class="summary-list">${item.bullets.map((b, i) => {
    const id = bulletId(item.id, i);
    return `<li><label class="bullet-check"><input class="bullet-input" type="checkbox" data-bullet-id="${id}" ${isDone(id) ? 'checked' : ''}><span class="bullet-box"><iconify-icon icon="ph:check-bold"></iconify-icon></span><span>${esc(b)}</span></label></li>`;
  }).join('')}</ul></span>`;
}
function renderPowerDiagram(mode = 'inline') {
  const rows = [
    {p:'A0', charger:'Apple', port:'Fonte original + MagSafe 3', out:'Conforme fonte Apple', dev:'MacBook Pro', need:'MagSafe 3 / USB-C PD', time:'backup/ingest', note:'fora da matriz audiovisual'},
    {p:'A1', charger:'Baseus 140W', port:'C1', out:'100W máx. em uso com 3 portas', dev:'Ugreen Power Bank 25.000 mAh', need:'USB-C1 entrada até 65W · 90Wh', time:'prioridade máxima', note:'reserva de campo'},
    {p:'A6', charger:'Baseus 140W', port:'C2', out:'20W em uso com 3 portas', dev:'iPhone 15 Pro Max', need:'USB-C PD 20W+', time:'até 50% em ~30 min', note:'comunicação e vertical'},
    {p:'A7', charger:'Baseus 140W', port:'USB-A', out:'18W em uso com 3 portas', dev:'GoPro HERO 11', need:'5V · 1A–2A', time:'carga leve/estável', note:'água e ação'},
    {p:'A2', charger:'AS330W', port:'C3', out:'30W máx. · 5V3A/9V3A/12V2.5A/15V2A/20V1.5A', dev:'Hub DJI Mini 4 Pro', need:'5V3A / 9V3A / 12V3A', time:'3 baterias em sequência', note:'porta certa; não precisa 100W'},
    {p:'A3', charger:'AS330W', port:'C4', out:'30W máx.', dev:'DJI RC2', need:'até 9V3A · bateria 22,32Wh', time:'~1h30', note:'controle do drone'},
    {p:'A4', charger:'AS330W', port:'C5', out:'30W máx.', dev:'NP-FW50 · ZV-E10', need:'carregador duplo / USB · câmera interna ~150 min', time:'porta dedicada', note:'câmera principal'},
    {p:'A5', charger:'AS330W', port:'C6', out:'30W máx.', dev:'Hollyland Lark Max 2', need:'Mic 167mAh · RX 300mAh · case 2000mAh', time:'mic/RX ~1h30 · case ~2h', note:'áudio limpo'},
    {p:'B1', charger:'AS330W', port:'C1', out:'100W máx. usado como 10W+', dev:'DJI Osmo Mobile 6', need:'USB-C · 10W recomendado', time:'~1h24', note:'gimbal celular'},
    {p:'B2', charger:'AS330W', port:'C2', out:'100W máx. usado como 5V', dev:'Ulanzi VL120 / fill light', need:'VL120 5V · 3100mAh', time:'~2h30', note:'luz de apoio'},
    {p:'C', charger:'AS330W', port:'USB-A', out:'rodízio leve', dev:'Kica JetFan / fan ZV-E10', need:'JetFan comum ~5V1A; se Max até 54W', time:'rodízio', note:'manutenção/apoio'}
  ];

  return `
  <div class="charge-map charge-map--v29" aria-label="Mapa profissional de recarga por prioridade e especificação elétrica">
    <header class="charge-map__head charge-map__head--v29">
      <div>
        <span>Mapa técnico de baterias</span>
        <strong>Recarga por prioridade, potência e tempo real</strong>
        <p>O card do checklist ficou simples. Esta tela concentra o desenho técnico: tomada, carregadores, portas, cabos, potência disponível, necessidade de entrada e prioridade operacional.</p>
      </div>
      <div class="charge-map__badges">
        <span><i class="prio prio-a">A</i> bateria crítica</span>
        <span><i class="prio prio-b">B</i> operação</span>
        <span><i class="prio prio-c">C</i> rodízio</span>
      </div>
    </header>

    <section class="v29-spine">
      <div class="v29-wall">
        <iconify-icon icon="ph:plug-charging-bold"></iconify-icon>
        <strong>Tomada / régua boa</strong>
        <span>1 ponto físico · 3 carregadores · nada no chão</span>
      </div>
      <div class="v29-ac-lines"><i></i><i></i><i></i></div>
    </section>

    <section class="v29-chargers">
      <article class="v29-charger v29-charger--apple">
        <h3><iconify-icon icon="ph:laptop-bold"></iconify-icon>Apple/MagSafe</h3>
        <p>MacBook isolado para backup. Não disputa energia audiovisual.</p>
        <div class="v29-wire v29-wire--a"><b>Fonte Apple</b><i></i><strong><em>A0</em>MacBook Pro</strong></div>
      </article>

      <article class="v29-charger v29-charger--baseus">
        <h3><iconify-icon icon="ph:battery-charging-bold"></iconify-icon>Baseus 140W</h3>
        <p>Três portas ocupadas: 100W + 20W + 18W.</p>
        <div class="v29-wire v29-wire--a"><b>C1 · 100W</b><i></i><strong><em>A1</em>Ugreen 25.000 mAh</strong></div>
        <div class="v29-wire v29-wire--a"><b>C2 · 20W</b><i></i><strong><em>A6</em>iPhone 15 Pro Max</strong></div>
        <div class="v29-wire v29-wire--a"><b>USB-A · 18W</b><i></i><strong><em>A7</em>GoPro HERO 11</strong></div>
      </article>

      <article class="v29-charger v29-charger--as">
        <h3><iconify-icon icon="ph:lightning-bold"></iconify-icon>AS330W 330W</h3>
        <p>Matriz audiovisual: baterias, controle, câmera, áudio, gimbal e luz.</p>
        <div class="v29-grid">
          <div class="v29-wire v29-wire--a"><b>C3 · 30W</b><i></i><strong><em>A2</em>Hub DJI Mini 4 Pro</strong></div>
          <div class="v29-wire v29-wire--a"><b>C4 · 30W</b><i></i><strong><em>A3</em>DJI RC2</strong></div>
          <div class="v29-wire v29-wire--a"><b>C5 · 30W</b><i></i><strong><em>A4</em>NP-FW50 · ZV-E10</strong></div>
          <div class="v29-wire v29-wire--a"><b>C6 · 30W</b><i></i><strong><em>A5</em>Lark Max 2</strong></div>
          <div class="v29-wire v29-wire--b"><b>C1 · 100W</b><i></i><strong><em>B1</em>DJI Osmo Mobile 6</strong></div>
          <div class="v29-wire v29-wire--b"><b>C2 · 100W</b><i></i><strong><em>B2</em>VL120 / fill light</strong></div>
          <div class="v29-wire v29-wire--c"><b>USB-A</b><i></i><strong><em>C</em>Kica / fan ZV-E10</strong></div>
        </div>
      </article>
    </section>

    <section class="v29-priority">
      <strong>Ordem prática antes de dormir</strong>
      <div>
        <span><b>A1</b>Ugreen</span>
        <span><b>A2</b>Drone</span>
        <span><b>A3</b>RC2</span>
        <span><b>A4</b>ZV-E10</span>
        <span><b>A5</b>Lark</span>
        <span><b>A6</b>iPhone</span>
        <span><b>A7</b>GoPro</span>
        <span><b>B/C</b>Osmo, luzes e fans</span>
      </div>
    </section>

    <section class="v29-table">
      <h3>Especificação elétrica por conexão</h3>
      <div class="v29-table__head">
        <span>Prioridade</span><span>Carregador</span><span>Porta</span><span>Saída planejada</span><span>Dispositivo</span><span>Entrada/carga do dispositivo</span><span>Tempo / uso</span><span>Critério</span>
      </div>
      ${rows.map(row => `
        <div class="v29-table__row v29-table__row--${row.p.startsWith('A') ? 'a' : row.p.startsWith('B') ? 'b' : 'c'}">
          <span><i>${row.p}</i></span>
          <span>${row.charger}</span>
          <span>${row.port}</span>
          <span>${row.out}</span>
          <strong>${row.dev}</strong>
          <span>${row.need}</span>
          <span>${row.time}</span>
          <em>${row.note}</em>
        </div>
      `).join('')}
    </section>

    <section class="v29-notes">
      <div><iconify-icon icon="ph:database-bold"></iconify-icon><strong>Zona limpa</strong><span>MacBook, cartões, leitor Ugreen e pendrives. Sem carregadores.</span></div>
      <div><iconify-icon icon="ph:plugs-connected-bold"></iconify-icon><strong>Zona de energia</strong><span>Apple, Baseus e AS330W no fundo/centro da mesa. Cabos presos.</span></div>
      <div><iconify-icon icon="ph:warning-bold"></iconify-icon><strong>Regra crítica</strong><span>Não marque como concluído antes de ver todos os LEDs/cargas ativas.</span></div>
    </section>
  </div>`;
}

function renderPowerInlineCta() {
  return `
    <div class="power-cta">
      <div>
        <strong>Desenho técnico em tela cheia</strong>
        <span>Abra a visualização dedicada para ver tomada, carregadores, portas, cabos e dispositivos finais sem corte.</span>
      </div>
      <button type="button" class="power-open-btn" data-open-power-map>
        <iconify-icon icon="ph:flow-arrow-bold"></iconify-icon>
        Abrir desenho completo
      </button>
    </div>`;
}

function renderDetails(item) {
  return (item.details || []).map(block => {
    if (block.type === 'power-diagram') {
      return `<div class="detail-card detail-card--visual"><strong>${esc(block.title)}</strong>${renderPowerInlineCta()}</div>`;
    }
    return `<div class="detail-card"><strong>${esc(block.title)}</strong><ul>${(block.items || []).map(text => `<li>${esc(text)}</li>`).join('')}</ul></div>`;
  }).join('');
}

function renderItem(item, section) {
  const node = els.itemTpl.content.cloneNode(true);
  const card = node.querySelector('.check-item');
  const checkbox = node.querySelector('.item-input');
  const toggle = node.querySelector('.detail-toggle');
  const expanded = node.querySelector('.detail-expanded');
  const done = itemDone(item);

  card.dataset.tags = item.tags.join(' · ');
  card.dataset.itemId = item.id;
  card.dataset.sectionId = section.id;
  card.dataset.critical = item.critical ? 'true' : 'false';
  card.classList.toggle('is-done', done);
  card.classList.toggle('is-expanded', !!state.expanded[item.id]);
  checkbox.checked = done;

  node.querySelector('.check-item__title').textContent = item.title;
  node.querySelector('.check-item__summary').innerHTML = renderSummary(item);
  expanded.innerHTML = renderDetails(item);
  toggle.setAttribute('aria-expanded', state.expanded[item.id] ? 'true' : 'false');
  toggle.querySelector('span').textContent = state.expanded[item.id] ? 'Menos' : 'Detalhes';

  checkbox.addEventListener('change', event => {
    const value = checkbox.checked;
    bulletUnits(item).forEach(unit => state.checked[unit.id] = value);
    state.checked[item.id] = value;
    syncItemCompletion(item);
    if (sectionDone(section)) openNextSection(section.id);
    save();
    render();
  });

  node.querySelectorAll('[data-open-power-map]').forEach(button => {
    button.addEventListener('click', event => {
      event.stopPropagation();
      openPowerMapRoute();
    });
  });

  node.querySelectorAll('.summary-check-input').forEach(input => {
    input.addEventListener('click', event => event.stopPropagation());
    input.addEventListener('change', event => {
      event.stopPropagation();
      state.checked[input.dataset.bulletId] = input.checked;
      syncItemCompletion(item);
      if (sectionDone(section)) openNextSection(section.id);
      save();
      render();
    });
  });

  toggle.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    const nextState = !state.expanded[item.id];
    if (window.innerWidth >= 920 && card.dataset.row) {
      [...document.querySelectorAll(`.section-card#${section.id} .check-item[data-row="${card.dataset.row}"]`)].forEach(rowCard => {
        if (rowCard.dataset.itemId) state.expanded[rowCard.dataset.itemId] = nextState;
      });
    } else {
      state.expanded[item.id] = nextState;
    }
    save();
    render();
  });
  return node;
}

function openNextSection(currentId) {
  const next = firstIncompleteSection();
  state.openSections = next ? [next.id] : [];
  if (next && next.id !== currentId) setTimeout(() => document.getElementById(next.id)?.scrollIntoView({ behavior:'smooth', block:'start' }), 120);
}


let lastPowerFocus = null;

function isPowerRoute() {
  return location.hash === '#/energia' || location.hash === '#energia' || location.hash === '#/desenho-energia';
}

function openPowerMapRoute() {
  if (!isPowerRoute()) {
    location.hash = '/energia';
  } else {
    openPowerModal();
  }
}

function openPowerModal() {
  if (!els.powerModal) return;
  lastPowerFocus = document.activeElement;
  els.powerModal.hidden = false;
  els.powerModal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  if (els.powerModalDiagram && !els.powerModalDiagram.dataset.ready) {
    els.powerModalDiagram.innerHTML = renderPowerDiagram('full');
    els.powerModalDiagram.dataset.ready = 'true';
  }
  requestAnimationFrame(() => els.powerModalPanel?.focus());
}

function clearPowerRoute() {
  if (isPowerRoute()) {
    history.pushState('', document.title, location.pathname + location.search);
  }
}

function closePowerModal({clearHash = true} = {}) {
  if (!els.powerModal) return;
  els.powerModal.hidden = true;
  els.powerModal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  if (clearHash) clearPowerRoute();
  if (lastPowerFocus && typeof lastPowerFocus.focus === 'function') {
    requestAnimationFrame(() => lastPowerFocus.focus());
  }
}

function syncPowerRoute() {
  if (isPowerRoute()) openPowerModal();
  else closePowerModal({clearHash:false});
}

function render() {
  ensureAutoOpen();
  applyControlsVisibility();
  renderFilters();
  renderStats();
  els.searchInput.value = state.query;
  els.hideDone.innerHTML = state.hideDone ? '<iconify-icon icon="ph:eye-bold"></iconify-icon> Mostrar feitos' : '<iconify-icon icon="ph:eye-slash-bold"></iconify-icon> Ocultar feitos';
  els.sections.innerHTML = '';

  const visible = getVisibleItems();
  const visibleIds = new Set(visible.map(item => item.id));
  checklist.forEach(section => {
    if (!filterAllowsSection(section)) return;
    const sectionVisible = sectionItems(section).filter(item => visibleIds.has(item.id));
    if (!sectionVisible.length) return;

    const node = els.sectionTpl.content.cloneNode(true);
    const card = node.querySelector('.section-card');
    const header = node.querySelector('.section-card__header');
    const progress = sectionProgress(section);
    const active = firstIncompleteSection()?.id === section.id;
    card.id = section.id;
    card.classList.toggle('is-active', active);
    card.classList.toggle('is-complete', sectionDone(section));
    if (!state.openSections.includes(section.id)) card.classList.add('is-collapsed');
    node.querySelector('.section-card__icon').innerHTML = `<iconify-icon icon="${iconForSection(section)}"></iconify-icon>`;
    node.querySelector('.section-card__title small').textContent = section.kicker;
    node.querySelector('.section-card__title strong').textContent = section.title;
    const goalEl = node.querySelector('.section-goal, .section-card__goal');
    if (goalEl) goalEl.textContent = section.goal || '';
    node.querySelector('.section-card__progress em').textContent = `${progress.done}/${progress.total}`;
    node.querySelector('.mini-bar i').style.width = `${progress.pct}%`;
    header.addEventListener('click', () => {
      state.openSections = state.openSections.includes(section.id) ? state.openSections.filter(id => id !== section.id) : [...state.openSections, section.id];
      save(); render();
    });
    const body = node.querySelector('.section-card__body');
    sectionVisible.forEach(item => body.appendChild(renderItem(item, section)));
    els.sections.appendChild(node);
  });
  if (!visible.length) els.sections.innerHTML = '<div class="empty-state">Nenhum card encontrado com os filtros atuais.</div>';
  updateProgress(visible);
  requestAnimationFrame(assignDetailRows);
}

function updateProgress(visibleCards) {
  const units = allBulletUnits();
  const done = units.filter(unit => isDone(unit.id)).length;
  const pending = units.length - done;
  const pct = units.length ? Math.round(done / units.length * 100) : 0;
  const visibleUnits = visibleCards.flatMap(item => bulletUnits(item));

  els.ring.style.setProperty('--progress', pct);
  els.percent.textContent = `${pct}%`;
  els.progressTitle.textContent = `${done} de ${units.length} itens`;
  els.progressSubtitle.textContent = done === units.length ? 'Checklist completo.' : `${pending} itens pendentes.`;
  els.visible.textContent = `${visibleCards.length} cards visíveis · ${visibleUnits.filter(unit => !isDone(unit.id)).length} itens pendentes`;

  if (els.scoreMini) {
    els.scoreMini.innerHTML = `
      <div><span>Dados</span><strong>Salvos no navegador</strong></div>
      <div><span>Controles</span><strong>${state.controlsVisible === false ? 'Ocultos' : 'Visíveis'}</strong></div>
      <div><span>Feitos</span><strong>${state.hideDone ? 'Ocultos' : 'Visíveis'}</strong></div>
    `;
  }
}

function assignDetailRows() {
  document.querySelectorAll('.section-card__body').forEach(body => {
    const cards = [...body.querySelectorAll('.check-item')];
    const rows = new Map();
    cards.forEach(card => {
      card.dataset.row = '';
      if (window.innerWidth < 920) return;
      const key = Math.round(card.offsetTop);
      if (!rows.has(key)) rows.set(key, rows.size + 1);
      card.dataset.row = String(rows.get(key));
    });
  });
}

function setVisible(value) {
  getVisibleItems().forEach(item => {
    bulletUnits(item).forEach(unit => state.checked[unit.id] = value);
    state.checked[item.id] = value;
    syncItemCompletion(item);
  });
  save();
  render();
}
function setAll(value) {
  allItems().forEach(item => {
    bulletUnits(item).forEach(unit => state.checked[unit.id] = value);
    state.checked[item.id] = value;
    syncItemCompletion(item);
  });
  save({ forceReset: value === false });
  render();
}
function exportJson() {
  const data = {
    title: 'São Thomé das Letras — Checklist v33', exportedAt: new Date().toISOString(), total: allBulletUnits().length,
    done: allBulletUnits().filter(unit => isDone(unit.id)).length,
    sections: checklist.map(section => ({ id: section.id, title: section.title, progress: sectionProgress(section), items: sectionItems(section).map(item => ({ id:item.id, title:item.title, done:itemDone(item), bullets: bulletUnits(item).map(unit => ({ id:unit.id, title:unit.text, done:isDone(unit.id) })) })) }))
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type:'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url; link.download = 'checklist_stl_v33.json'; document.body.appendChild(link); link.click(); link.remove(); URL.revokeObjectURL(url);
}
function updateScrolledHeader() { document.body.classList.toggle('is-scrolled', window.scrollY > 24); }

els.searchToggle.addEventListener('click', () => { els.searchPanel.classList.toggle('is-open'); if (els.searchPanel.classList.contains('is-open')) setTimeout(() => els.searchInput.focus(), 160); });
els.searchClear.addEventListener('click', () => { state.query=''; save(); render(); els.searchInput.focus(); });
els.searchInput.addEventListener('input', event => { state.query = event.target.value; save(); render(); });
els.filterPrev.addEventListener('click', () => els.filters.scrollBy({ left:-380, behavior:'smooth' }));
els.filterNext.addEventListener('click', () => els.filters.scrollBy({ left:380, behavior:'smooth' }));
els.markVisible.addEventListener('click', () => { if (confirm('Marcar todos os itens visíveis?')) setVisible(true); });
els.clearVisible.addEventListener('click', () => { if (confirm('Limpar todos os itens visíveis?')) setVisible(false); });
els.markAll.addEventListener('click', () => { if (confirm('Marcar tudo?')) setAll(true); });
els.clearAll.addEventListener('click', () => { if (confirm('Limpar tudo?')) setAll(false); });
els.reset.addEventListener('click', () => { if (confirm('Resetar todo o checklist?')) { state.checked={}; state.filter='all'; state.query=''; state.hideDone=true; state.openSections=[]; state.expanded={}; state.controlsVisible=false; save({ forceReset: true }); render(); } });
els.exportBtn.addEventListener('click', exportJson);
els.toggleControls.addEventListener('click', () => { state.controlsVisible = state.controlsVisible === false ? true : false; save(); render(); });
els.moreToggle.addEventListener('click', () => els.more.classList.toggle('is-open'));
document.addEventListener('click', event => { if (!els.more.contains(event.target)) els.more.classList.remove('is-open'); });
els.hideDone.addEventListener('click', () => { state.hideDone = !state.hideDone; save(); render(); });
els.expandAll.addEventListener('click', () => { state.openSections = checklist.map(section => section.id); save(); render(); });
els.collapseAll.addEventListener('click', () => { const active = firstIncompleteSection(); state.openSections = active ? [active.id] : []; save(); render(); });
els.backTop.addEventListener('click', () => scrollTo({ top:0, behavior:'smooth' }));
addEventListener('scroll', () => { updateScrolledHeader(); els.backTop.classList.toggle('is-visible', scrollY > 640); });
addEventListener('resize', () => requestAnimationFrame(assignDetailRows));


els.powerModalClose?.addEventListener('click', () => closePowerModal());
els.powerModalBackdrop?.addEventListener('click', () => closePowerModal());
els.powerModalPrint?.addEventListener('click', () => window.print());
window.addEventListener('hashchange', syncPowerRoute);
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && els.powerModal && !els.powerModal.hidden) closePowerModal();
});

load();
if (!state.openSections.length) state.openSections = [firstIncompleteSection()?.id].filter(Boolean);
if (state.query) els.searchPanel.classList.add('is-open');
updateScrolledHeader();
render();
syncPowerRoute();
initCloudSync();
