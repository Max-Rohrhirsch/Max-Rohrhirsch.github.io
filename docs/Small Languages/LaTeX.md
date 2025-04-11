# LaTeX

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>

```latex
% Basic
\documentclass[12pt]{article}  

\usepackage{hyperref} 
\usepackage{fullpage} 
\usepackage[top=2cm, bottom=1cm]{geometry} 
\usepackage{graphicx} 
\usepackage{xcolor} 

\begin{document}  
    % ...
\end{document}
```
```latex
% Title
                
\title{Seminararbeit 2023}
\author{Max Rohrhirsch}
\maketitle 
```
```latex
% Math
            
${(x + 1) = (x-y)^{5 + 1}}$ vs (x + 1)
$${A_2(x) = x^2 + y}$$
$$a_0, a_1, a_2, \ldots, a_{100}$$

% Greek letters
$$\pi$$
$$\alpha$$

% Trig functions
$$\sin x$$
$$\sqrt{3}$$
$$\frac{2}{4}$$

% Arrays 
$\{1, 2, 3\}$
\$
```
```latex
% Tables

\begin{tabular}{|l||p{2cm}|c|c|c|}
\hline
$x$ & 1 & 2 & 3 & 4 \\ \hline
$f(x)$ & 10 & 11 & 12 & 13 \\ \hline
\end{tabular}

\begin{table}[H]
    \centering
    \begin{tabular}{c|c}
        x & 1\\
        y & 2
    \end{tabular}
    \caption{My caption}
    \label{tab:my_label}
\end{table}
```
```latex
% List
                
\begin{enumerate} \setcounter{enumi}{5}
    \item first
    \item second
    \item third
    \begin{enumerate}
        \item jes
        \item sjdf
        \item dfsdf
    \end{enumerate}
\end{enumerate}
```
```latex
% Formatting
                
\textit{Text Italiciezed} 

\textbf{Text Bold} 

\texttt{Text Typewrite} 

\url{https://www.overleaf.com}

\href{https://www.overleaf.com}{My website}

\vspace{1cm}
```
```latex
% Float
             
\begin{flushleft}
    This line is left
\end{flushleft}

\begin{flushright}
    This is Right
\end{flushright}

\begin{center}
    Centered Text
\end{center}
```
```latex
% Color

\color{red}
    Text
\color{white}
```
```latex
% Section
                
\tableofcontents

\section{H1 title}
    \subsection{H2 title}
        \subsubsection{}
\section{H1 2title}
```
```latex
% Image
                
\includegraphics[scale=0.4]{frog.jpg}
```
```latex
% Function
                
\def\eq1{y=...}
% ...

$$\eq1$$
```
```latex
% Own command
                
\newcommand{\set}[1]{\setlength\itemsep{#1 cm}}
% ...

\set{1.2}
```
```latex
% Usefull 
                
\setcounter{page}{5} 

\usepackage[sfdefault]{roboto} 

\begingroup 
    This is the Thin version 
\endgroup 
```
```latex
% Quote
                
Quelle: \cite{latexcompanion,knuthwebsite} 

%Sets the bibliography style to UNSRT and 
%imports the bibliography file "sample.bib". 
\bibliographystyle{unsrt} 
\bibliography{sample} 

% ------------------

@article{einstein, 
    author =       "Albert Einstein", 
    title =        "MyTitle", 
    url       = "http:..." ,
    pages =        "891--921", 
    year      = "1993", 
    publisher = "Addison-Wesley", 
    year =         "1905", 
} 
```
```latex
% Code Highlight

\begin{minted}[xleftmargin=\parindent,linenos]{cpp}

\end{minted}

\mintinline{latex}{code}
```
</div>