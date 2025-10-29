#!/bin/bash
# Compilation script for the Fractal Metascience Paradigm monograph
# Requires: pdflatex, bibtex

set -e

TEXFILE="fmp_monograph.tex"
BIBFILE="references.bib"

if [ ! -f "$TEXFILE" ]; then
  echo "Error: $TEXFILE not found."
  exit 1
fi

if [ ! -f "$BIBFILE" ]; then
  echo "Error: $BIBFILE not found."
  exit 1
fi

# First LaTeX run
pdflatex "$TEXFILE"

# Run BibTeX for citations
bibtex fmp_monograph

# Two more LaTeX passes for proper references
pdflatex "$TEXFILE"
pdflatex "$TEXFILE"

echo "----------------------------------------------------"
echo "Monograph compiled successfully: fmp_monograph.pdf"
echo "----------------------------------------------------"
