create table if not exists portfolios (
  id char(36) primary key,
  title varchar(255) not null,
  slug varchar(255) not null unique,
  category varchar(120) not null,
  short_description varchar(180) not null,
  overview text not null,
  role varchar(160) not null,
  timeline varchar(160) not null,
  status enum('draft', 'publish') not null default 'draft',
  featured tinyint(1) not null default 0,
  thumbnail_url text not null,
  cover_image_url text null,
  problem_statement text not null,
  goals text not null,
  process text not null,
  solution text not null,
  result text not null,
  lessons_learned text null,
  created_by varchar(255) null,
  created_at timestamp not null default current_timestamp,
  updated_at timestamp not null default current_timestamp on update current_timestamp,
  index idx_portfolios_status (status),
  index idx_portfolios_category (category),
  index idx_portfolios_featured (featured)
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists portfolio_tools (
  id char(36) primary key,
  portfolio_id char(36) not null,
  tool_name varchar(160) not null,
  sort_order int not null default 0,
  created_at timestamp not null default current_timestamp,
  index idx_portfolio_tools_portfolio_id (portfolio_id),
  constraint fk_portfolio_tools_portfolio
    foreign key (portfolio_id) references portfolios(id)
    on delete cascade
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

create table if not exists portfolio_gallery (
  id char(36) primary key,
  portfolio_id char(36) not null,
  image_url text not null,
  caption text null,
  sort_order int not null default 0,
  created_at timestamp not null default current_timestamp,
  index idx_portfolio_gallery_portfolio_id (portfolio_id),
  constraint fk_portfolio_gallery_portfolio
    foreign key (portfolio_id) references portfolios(id)
    on delete cascade
) engine=InnoDB default charset=utf8mb4 collate=utf8mb4_unicode_ci;

