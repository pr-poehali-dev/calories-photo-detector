import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const analyzePhoto = () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 3000);
  };

  const resetAnalysis = () => {
    setSelectedFile(null);
    setShowResults(false);
    setIsAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-cyan-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Camera" className="text-primary" size={32} />
              <h1 className="text-2xl font-heading font-bold text-gray-900">
                Калории по фото
              </h1>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              AI-анализ
            </Badge>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h2 className="text-5xl font-heading font-bold text-gray-900 mb-6">
            Узнай калорийность блюда
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              {" "}
              за секунды
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Сфотографируй свое блюдо и получи точный анализ калорий, белков,
            жиров и углеводов с помощью нейросети
          </p>

          <div className="flex items-center justify-center space-x-6 mb-12">
            <div className="flex items-center space-x-2">
              <Icon name="Brain" className="text-primary" size={24} />
              <span className="text-sm font-medium text-gray-700">
                Нейросеть
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Zap" className="text-primary" size={24} />
              <span className="text-sm font-medium text-gray-700">
                Мгновенно
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Target" className="text-primary" size={24} />
              <span className="text-sm font-medium text-gray-700">Точно</span>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-2xl mx-auto">
          {!showResults ? (
            <Card className="border-2 border-dashed border-gray-300 bg-white/60 backdrop-blur-sm animate-scale-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-heading text-gray-900">
                  Загрузи фото своего блюда
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Перетащи изображение или выбери файл
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                    dragActive
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 hover:border-primary/50"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {selectedFile ? (
                    <div className="space-y-4">
                      <Icon
                        name="CheckCircle"
                        className="text-green-500 mx-auto"
                        size={48}
                      />
                      <p className="text-sm text-gray-600">
                        Выбран файл: {selectedFile.name}
                      </p>
                      <div className="flex space-x-3 justify-center">
                        <Button
                          onClick={analyzePhoto}
                          disabled={isAnalyzing}
                          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                        >
                          {isAnalyzing ? (
                            <>
                              <Icon
                                name="Loader2"
                                className="animate-spin mr-2"
                                size={16}
                              />
                              Анализирую...
                            </>
                          ) : (
                            <>
                              <Icon
                                name="Sparkles"
                                className="mr-2"
                                size={16}
                              />
                              Анализировать
                            </>
                          )}
                        </Button>
                        <Button variant="outline" onClick={resetAnalysis}>
                          Сбросить
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Icon
                        name="Upload"
                        className="text-gray-400 mx-auto"
                        size={48}
                      />
                      <div>
                        <p className="text-gray-600 mb-2">
                          Перетащите файл сюда или
                        </p>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileSelect}
                            className="hidden"
                          />
                          <Button
                            variant="outline"
                            className="border-primary text-primary hover:bg-primary hover:text-white"
                          >
                            Выберите файл
                          </Button>
                        </label>
                      </div>
                      <p className="text-xs text-gray-500">
                        Поддерживаются форматы: JPG, PNG, WebP
                      </p>
                    </div>
                  )}
                </div>

                {isAnalyzing && (
                  <div className="mt-6 space-y-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="Brain" className="text-primary" size={20} />
                      <span className="text-sm font-medium">
                        Нейросеть анализирует изображение...
                      </span>
                    </div>
                    <Progress value={66} className="h-2" />
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            /* Results Section */
            <div className="space-y-6 animate-fade-in">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl font-heading text-gray-900">
                      Результаты анализа
                    </CardTitle>
                    <Button
                      variant="outline"
                      onClick={resetAnalysis}
                      className="border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <Icon name="RotateCcw" className="mr-2" size={16} />
                      Новый анализ
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <img
                        src="/img/8ad57ed0-f5fe-44b8-aa06-a72ee122f29d.jpg"
                        alt="Analyzed food"
                        className="w-full h-64 object-cover rounded-lg shadow-md"
                      />
                      <div className="text-center">
                        <h3 className="font-heading font-semibold text-lg">
                          Куриная грудка с овощами
                        </h3>
                        <p className="text-sm text-gray-600">Порция: ~300г</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4">
                        <div className="text-center">
                          <div className="text-3xl font-heading font-bold text-primary mb-1">
                            387
                          </div>
                          <div className="text-sm text-gray-600">калорий</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-green-50 rounded-lg p-3 text-center">
                          <div className="text-lg font-semibold text-green-700">
                            42г
                          </div>
                          <div className="text-xs text-green-600">Белки</div>
                        </div>
                        <div className="bg-blue-50 rounded-lg p-3 text-center">
                          <div className="text-lg font-semibold text-blue-700">
                            8г
                          </div>
                          <div className="text-xs text-blue-600">Жиры</div>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-3 text-center">
                          <div className="text-lg font-semibold text-orange-700">
                            28г
                          </div>
                          <div className="text-xs text-orange-600">
                            Углеводы
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">
                            Точность анализа
                          </span>
                          <span className="text-sm font-semibold text-green-600">
                            94%
                          </span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-heading">
                    Детальный состав
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm">Куриная грудка (180г)</span>
                      <span className="text-sm font-semibold">297 ккал</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm">Киноа (60г)</span>
                      <span className="text-sm font-semibold">55 ккал</span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm">Овощи (60г)</span>
                      <span className="text-sm font-semibold">35 ккал</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-sm border-t border-orange-200 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <p className="mb-2">
              Калории по фото — точный анализ питания с помощью ИИ
            </p>
            <div className="flex items-center justify-center space-x-4">
              <Badge variant="outline" className="text-xs">
                <Icon name="Shield" className="mr-1" size={12} />
                Безопасно
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Icon name="Zap" className="mr-1" size={12} />
                Быстро
              </Badge>
              <Badge variant="outline" className="text-xs">
                <Icon name="Award" className="mr-1" size={12} />
                Точно
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
