'use babel';

import LanguageOz2View from './language-oz-2-view';
import { CompositeDisposable } from 'atom';

export default {

  languageOz2View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.languageOz2View = new LanguageOz2View(state.languageOz2ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.languageOz2View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'language-oz-2:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.languageOz2View.destroy();
  },

  serialize() {
    return {
      languageOz2ViewState: this.languageOz2View.serialize()
    };
  },

  toggle() {
    console.log('LanguageOz2 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
