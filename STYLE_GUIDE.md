# 样式指南 (Style Guide)

## CSS Class 集合

所有可复用的样式类定义在 `src/styles/globals.css` 中。

### 标题样式

- **`.page-title`** - 页面主标题
  - 字体：text-4xl (36px)
  - 间距：mb-12 (48px)
  - 用于：每个页面的 h1 标题

- **`.section-title`** - 区块标题  
  - 字体：text-2xl (24px)
  - 间距：mb-8 (32px)
  - 用于：首页"最近记录"、"时刻"等区块标题

- **`.card-title`** - 卡片标题
  - 字体：text-2xl (24px)
  - 间距：mb-3 (12px)
  - 用于：文章列表项标题

- **`.article-title`** - 文章标题
  - 字体：text-xl (20px)
  - 间距：mb-2 (8px)
  - 用于：首页文章列表的标题

### 文本样式

- **`.text-secondary`** - 次要文本颜色
  - 使用 CSS 变量 `var(--color-text-secondary)`
  - 自动适配暗色模式

- **`.text-meta`** - 元信息文本
  - 字体：text-sm (14px)
  - 颜色：text-secondary
  - 用于：日期、作者等元信息

- **`.text-description`** - 描述文本
  - 颜色：text-secondary
  - 行高：leading-relaxed (1.625)
  - 用于：文章摘要、时刻描述等

### 链接样式

- **`.link-primary`** - 主链接样式
  - 默认：黑色文字
  - Hover：主色调 (primary)
  - 带过渡动画

- **`.link-view-all`** - "查看全部"链接
  - 字体：text-sm (14px)
  - 使用 link-primary 的 hover 效果

### 卡片样式

- **`.card-hover`** - 卡片 hover 效果
  - 底部边框
  - Hover 时边框变为主色调
  - 带过渡动画

- **`.card-title-hover`** - 卡片标题 hover 效果
  - Group hover 时文字变为主色调
  - 配合 `.group` 使用

### 间距样式

- **`.section-spacing`** - 区块间距
  - space-y-8 (32px 垂直间距)
  - 用于：文章列表等需要统一间距的区块

- **`.list-spacing`** - 列表间距
  - space-y-6 (24px 垂直间距)
  - 用于：首页文章列表

- **`.card-spacing`** - 卡片间距
  - pb-8 (32px 底部内边距)
  - 用于：列表项底部间距

### 布局样式

- **`.grid-moments`** - 时刻网格布局
  - 移动端：1 列
  - 平板：2 列 (md:grid-cols-2)
  - 桌面：3 列 (lg:grid-cols-3)
  - 间距：gap-8 (32px)

### 其他样式

- **`.tag`** - 标签样式
  - 颜色：text-secondary
  - 用于：文章标签 (#tag)

- **`.meta-info`** - 元信息容器
  - Flex 布局，横向排列
  - 间距：gap-4 (16px)
  - 字体：text-sm (14px)
  - 颜色：text-secondary

## 使用示例

### 页面标题
```tsx
<h1 className="page-title">记录</h1>
```

### 文章列表项
```tsx
<article className="card-spacing card-hover">
  <h2 className="card-title card-title-hover">
    文章标题
  </h2>
  <p className="text-description mb-4">
    文章描述
  </p>
  <div className="meta-info">
    <time>2024-01-01</time>
    <span className="tag">#标签</span>
  </div>
</article>
```

### 查看全部链接
```tsx
<Link href="/records" className="link-view-all">
  查看全部 →
</Link>
```

## 修改样式

如需全局修改样式，只需编辑 `src/styles/globals.css` 中对应的 class 定义即可，所有使用该 class 的页面会自动更新。

例如，修改所有页面标题的间距：
```css
.page-title {
  @apply text-4xl font-bold mb-16; /* 将 mb-12 改为 mb-16 */
}
```
