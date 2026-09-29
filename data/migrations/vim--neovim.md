---
reviewed: 2026-09-29
majors:
  vim: 9
  neovim: 0
sources:
  - https://neovim.io/doc/user/nvim/#nvim-from-vim
  - https://neovim.io/doc/user/vim_diff/
---

## Compatibility

Neovim's own reference says editor and Vimscript features are mostly identical to Vim, with the exception of Vim9script. An existing Vim setup can be loaded from Neovim's config file, so you do not have to rewrite it before you start. Where the two differ, the `vim-differences` page is the complete list.

## Before you switch

The official guide is a short sequence:

1. Create your `init.vim` from inside Neovim with `:exe 'edit' stdpath('config') .. '/init.vim'`, then `:write ++p`.
2. Put these lines in it, so Neovim reads your Vim runtime directories and your `vimrc`:

   ```vim
   set runtimepath^=~/.vim runtimepath+=~/.vim/after
   let &packpath = &runtimepath
   source ~/.vimrc
   ```

3. Run `:restart`. Your existing Vim config is loaded.

Some features need extra software; the guide points at `provider-python` and `provider-clipboard` for what that is.

## Pitfalls

- **Vim9script is not supported.** Plugins and config written in it will not run, and the migration guide does not mention this.
- Some Vim options are gone. The guide's example is `'ttymouse'`, removed because mouse support is always enabled when possible. If you share one `vimrc` between both editors, guard Vim-only settings with `if !has('nvim')`, and Neovim-only ones with `if has('nvim')` or a check such as `exists(':tnoremap')`.
- Neovim uses its own locations: `$XDG_CONFIG_HOME/nvim/init.vim` instead of `.vimrc`, and a binary ShaDa file instead of the `.viminfo` text file. The `'viminfo'` option is kept as an alias for `'shada'`.
- On Windows the config lives under `~/AppData` rather than `~/.config`. To share one config across machines, create `~/AppData/Local/nvim/init.vim` containing only `source ~/.config/nvim/init.vim`.
- The `'compatible'` option was removed: Neovim is always "nocompatible".
