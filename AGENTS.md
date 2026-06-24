# Agent Instructions

## A. 项目概览 (Project Overview)

`blog-omnifj` 是一个基于 Next.js 16 与 React 19 的博客/文档站点，使用 TypeScript 编写，样式层采用 Tailwind CSS v4，内容框架使用 Nextra 4 渲染 Markdown/MDX 文档。

核心技术栈：

- **框架**：Next.js 16 (App Router) + React 19
- **语言**：TypeScript 5
- **样式**：Tailwind CSS v4、Sass
- **内容**：Nextra 4 + Nextra Theme Docs
- **包管理器**：pnpm (>=9.x)
- **Node 版本**：>=20.x

## B. 设置与命令 (Setup & Commands)

### Setup Commands

- Install: `pnpm install`
- Build: `pnpm build`
- Start (production): `pnpm start`
- Dev: `pnpm dev`
- Lint: `pnpm lint`

### Notes

- `pnpm build` 会自动触发 `postbuild`，执行 `next-sitemap` 与 `pagefind` 索引生成。
- 开发服务器默认监听 `8000` 端口；生产启动默认监听 `7000` 端口。

## C. 代码规范 (Code Style & Conventions)

- 所有新功能必须使用 TypeScript 编写，避免使用 `any`。
- 优先使用 Functional Components 与 React Hooks，避免 Class Components。
- 组件与工具函数优先使用默认导出或具名导出，保持文件职责单一。
- 样式优先使用 Tailwind CSS 工具类；复杂样式可借助 `class-variance-authority` / `clsx` / `tailwind-merge` 组合。
- 遵循项目已有的 `@antfu/eslint-config` 配置，提交前运行 `pnpm lint` 并通过检查。
- UI 组件基于 `components.json` 与 Radix UI 体系，新增组件应保持一致的 API 风格。

## D. 安全与禁令 (Security & Constraints)

- 禁止在任何代码或提交中硬编码 API Key、Token、密码等敏感信息。
- 不要提交 `.env` 文件；如需新增环境变量，请在 `.env.example` 中提供脱敏示例。
- 不要修改或绕过已有的 ESLint 配置以消除警告；应通过修复代码本身解决问题。
- 不要在客户端代码中暴露服务端密钥或私有配置。
