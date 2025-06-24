import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.jsx'
import { Input } from '@/components/ui/input.jsx'
import { Label } from '@/components/ui/label.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.jsx'
import { Slider } from '@/components/ui/slider.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Play, 
  Pause, 
  Download, 
  Palette, 
  Type, 
  Zap, 
  BarChart3, 
  MessageCircle, 
  Heart,
  TrendingUp,
  DollarSign,
  Target,
  Users,
  Clock,
  Sparkles,
  Eye,
  Share2
} from 'lucide-react'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('templates')
  const [selectedTemplate, setSelectedTemplate] = useState('myth-vs-reality')
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentScene, setCurrentScene] = useState(0)
  const [customization, setCustomization] = useState({
    primaryColor: '#8a3ab9',
    secondaryColor: '#4c68d7',
    accentColor: '#4ade80',
    goldColor: '#fbbf24',
    title: 'SCHLUSS DAMIT!',
    subtitle: 'Müde vom 9-5 Hamsterrad?',
    description: '95% aller Menschen arbeiten für ANDERE',
    animationSpeed: 1,
    fontSize: 'large'
  })
  
  const canvasRef = useRef(null)
  const intervalRef = useRef(null)

  const templates = {
    'myth-vs-reality': {
      name: 'Mythos vs. Realität',
      description: 'Entlarve Mythen über Online-Geldverdienen',
      icon: <Target className="w-5 h-5" />,
      scenes: [
        { type: 'hook', text: 'Du denkst Online-Geldverdienen ist Betrug?', duration: 3 },
        { type: 'myth', text: 'Mythos: Du brauchst Tausende zum Starten', duration: 3 },
        { type: 'reality', text: 'Realität: Starte mit 0€. Ernsthaft.', duration: 3 },
        { type: 'proof', text: 'Beweis: Meine ersten 500€ in 30 Tagen', duration: 3 },
        { type: 'cta', text: 'Swipe up für die Wahrheit!', duration: 3 }
      ]
    },
    'day-in-life': {
      name: 'Tag im Leben',
      description: 'Zeige die Freiheit des Online-Business',
      icon: <Clock className="w-5 h-5" />,
      scenes: [
        { type: 'morning', text: 'Mein Wecker? Meine Katze. (Kein Chef nötig)', duration: 3 },
        { type: 'work', text: '9 Uhr: Kaffee, Pyjama, Einnahmen checken', duration: 3 },
        { type: 'freedom', text: '13 Uhr: Mittagessen mit Familie', duration: 3 },
        { type: 'evening', text: '19 Uhr: Entspannt, keine Geldsorgen', duration: 3 },
        { type: 'cta', text: 'Bereit für DEINE Freiheit?', duration: 3 }
      ]
    },
    'problem-solved': {
      name: 'Problem Gelöst',
      description: 'Zeige konkrete Erfolgsgeschichten',
      icon: <TrendingUp className="w-5 h-5" />,
      scenes: [
        { type: 'problem', text: 'Müde von Schulden?', duration: 3 },
        { type: 'person', text: 'Lerne Sarah kennen. Sie war verschuldet.', duration: 3 },
        { type: 'solution', text: 'Dann entdeckte sie Affiliate Marketing', duration: 3 },
        { type: 'result', text: 'Ergebnis: Schuldenfrei in 12 Monaten!', duration: 3 },
        { type: 'cta', text: 'Willst du der Nächste sein?', duration: 3 }
      ]
    },
    'quick-tip': {
      name: 'Schneller Tipp',
      description: 'Biete sofortigen Mehrwert',
      icon: <Zap className="w-5 h-5" />,
      scenes: [
        { type: 'problem', text: 'Keine Zeit für Nebenverdienst?', duration: 3 },
        { type: 'tip', text: 'Hack: Automatisiere deine Social Media!', duration: 3 },
        { type: 'benefit', text: 'Spare Stunden, verdiene mehr!', duration: 3 },
        { type: 'cta', text: 'DM "HACK" für die komplette Strategie!', duration: 3 }
      ]
    },
    'future-vision': {
      name: 'Zukunftsvision',
      description: 'Male ein Bild der gewünschten Zukunft',
      icon: <Sparkles className="w-5 h-5" />,
      scenes: [
        { type: 'vision', text: 'Stell dir vor: Aufwachen ohne Wecker, überall auf der Welt', duration: 3 },
        { type: 'current', text: 'Aber jetzt: 9-5 und Rechnungen', duration: 3 },
        { type: 'bridge', text: 'Online-Einkommen ist die Brücke zur Freiheit', duration: 3 },
        { type: 'steps', text: 'Es beginnt mit: 1. Lernen 2. Handeln 3. Durchhalten', duration: 3 },
        { type: 'cta', text: 'Bereit deine Zukunft zu bauen?', duration: 3 }
      ]
    }
  }

  const interactiveElements = [
    { type: 'poll', name: 'Umfrage', icon: <BarChart3 className="w-4 h-4" />, description: 'Ja/Nein Fragen für Engagement' },
    { type: 'question', name: 'Frage-Box', icon: <MessageCircle className="w-4 h-4" />, description: 'Lass deine Audience Fragen stellen' },
    { type: 'quiz', name: 'Quiz', icon: <Target className="w-4 h-4" />, description: 'Teste Wissen und bilde weiter' },
    { type: 'slider', name: 'Emoji-Slider', icon: <Heart className="w-4 h-4" />, description: 'Emotionale Bewertungen sammeln' }
  ]

  const colorSchemes = {
    'instagram-purple': { primary: '#8a3ab9', secondary: '#4c68d7', accent: '#4ade80', gold: '#fbbf24' },
    'money-green': { primary: '#059669', secondary: '#10b981', accent: '#fbbf24', gold: '#f59e0b' },
    'trust-blue': { primary: '#1e40af', secondary: '#3b82f6', accent: '#10b981', gold: '#fbbf24' },
    'energy-orange': { primary: '#ea580c', secondary: '#f97316', accent: '#10b981', gold: '#fbbf24' },
    'premium-purple': { primary: '#7c3aed', secondary: '#8b5cf6', accent: '#4ade80', gold: '#fbbf24' }
  }

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentScene(prev => {
          const template = templates[selectedTemplate]
          if (prev >= template.scenes.length - 1) {
            setIsPlaying(false)
            return 0
          }
          return prev + 1
        })
      }, 3000 / customization.animationSpeed)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isPlaying, selectedTemplate, customization.animationSpeed])

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId)
    setCurrentScene(0)
    setIsPlaying(false)
  }

  const handleCustomizationChange = (key, value) => {
    setCustomization(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleColorSchemeChange = (scheme) => {
    const colors = colorSchemes[scheme]
    setCustomization(prev => ({
      ...prev,
      primaryColor: colors.primary,
      secondaryColor: colors.secondary,
      accentColor: colors.accent,
      goldColor: colors.gold
    }))
  }

  const generateCode = () => {
    const template = templates[selectedTemplate]
    const scene = template.scenes[currentScene]
    
    return `
// Instagram Story Animation Code
// Template: ${template.name}
// Scene: ${currentScene + 1}/${template.scenes.length}

const storyConfig = {
  template: "${selectedTemplate}",
  scene: ${currentScene},
  customization: ${JSON.stringify(customization, null, 2)},
  content: {
    type: "${scene.type}",
    text: "${scene.text}",
    duration: ${scene.duration}
  }
}

// CSS Animation Classes
.story-container {
  width: 1080px;
  height: 1920px;
  background: linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor});
  position: relative;
  overflow: hidden;
}

.story-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: ${customization.fontSize === 'large' ? '120px' : customization.fontSize === 'medium' ? '90px' : '60px'};
  font-weight: bold;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate(-50%, -30%) translateY(50px);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) translateY(0);
  }
}

// After Effects Expression (für Text-Animation)
// Füge dies zu deiner Text-Ebene hinzu:
/*
// Fade In Up Animation
const startTime = 0;
const duration = 0.8;
const delay = ${currentScene * 3};

if (time >= delay && time <= delay + duration) {
  const t = (time - delay) / duration;
  const easeOut = 1 - Math.pow(1 - t, 3);
  
  // Position
  const startY = value[1] + 50;
  const endY = value[1];
  const currentY = startY + (endY - startY) * easeOut;
  
  // Opacity
  const opacity = easeOut;
  
  [value[0], currentY];
} else if (time < delay) {
  [value[0], value[1] + 50];
} else {
  value;
}
*/
    `.trim()
  }

  const currentTemplate = templates[selectedTemplate]
  const currentSceneData = currentTemplate.scenes[currentScene]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Enhanced Instagram Story Animator
          </h1>
          <p className="text-purple-200 text-lg">
            Erstelle virale Stories für Online-Geldverdienen mit KI-optimierten Templates
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Instagram Story Mockup */}
                  <div 
                    className="w-full aspect-[9/16] rounded-2xl overflow-hidden relative"
                    style={{
                      background: `linear-gradient(135deg, ${customization.primaryColor}, ${customization.secondaryColor})`
                    }}
                  >
                    {/* Status Bar */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between text-white text-sm">
                      <span>9:41</span>
                      <span>100%</span>
                    </div>
                    
                    {/* Progress Bars */}
                    <div className="absolute top-12 left-4 right-4 flex gap-1">
                      {currentTemplate.scenes.map((_, index) => (
                        <div key={index} className="flex-1 h-1 bg-white/30 rounded">
                          <div 
                            className="h-full bg-white rounded transition-all duration-300"
                            style={{ 
                              width: index < currentScene ? '100%' : index === currentScene ? '50%' : '0%' 
                            }}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Main Content */}
                    <div className="absolute inset-0 flex items-center justify-center p-8">
                      <div className="text-center">
                        <h2 
                          className={`text-white font-bold mb-4 ${
                            customization.fontSize === 'large' ? 'text-2xl' : 
                            customization.fontSize === 'medium' ? 'text-xl' : 'text-lg'
                          }`}
                          style={{ 
                            color: currentSceneData.type === 'myth' ? '#ef4444' : 
                                   currentSceneData.type === 'reality' ? customization.accentColor :
                                   currentSceneData.type === 'cta' ? customization.goldColor : 'white'
                          }}
                        >
                          {currentSceneData.text}
                        </h2>
                        
                        {/* Scene Type Indicator */}
                        <Badge 
                          variant="secondary" 
                          className="bg-white/20 text-white border-white/30"
                        >
                          {currentSceneData.type.toUpperCase()}
                        </Badge>
                      </div>
                    </div>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center gap-4">
                      <Button
                        onClick={handlePlay}
                        size="sm"
                        className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                      >
                        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <span className="text-white text-sm self-center">
                        {currentScene + 1} / {currentTemplate.scenes.length}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Controls */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-black/20 border-purple-500/30">
                <TabsTrigger value="templates" className="text-white data-[state=active]:bg-purple-600">
                  Templates
                </TabsTrigger>
                <TabsTrigger value="customize" className="text-white data-[state=active]:bg-purple-600">
                  Anpassen
                </TabsTrigger>
                <TabsTrigger value="interactive" className="text-white data-[state=active]:bg-purple-600">
                  Interaktiv
                </TabsTrigger>
                <TabsTrigger value="export" className="text-white data-[state=active]:bg-purple-600">
                  Export
                </TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="space-y-4">
                <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white">Story Templates</CardTitle>
                    <CardDescription className="text-purple-200">
                      Wähle ein optimiertes Template für maximale Viralität
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(templates).map(([id, template]) => (
                        <Card 
                          key={id}
                          className={`cursor-pointer transition-all ${
                            selectedTemplate === id 
                              ? 'bg-purple-600/30 border-purple-400' 
                              : 'bg-black/10 border-purple-500/20 hover:bg-purple-600/10'
                          }`}
                          onClick={() => handleTemplateChange(id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              {template.icon}
                              <h3 className="text-white font-semibold">{template.name}</h3>
                            </div>
                            <p className="text-purple-200 text-sm">{template.description}</p>
                            <div className="mt-3 flex flex-wrap gap-1">
                              {template.scenes.map((scene, index) => (
                                <Badge key={index} variant="outline" className="text-xs border-purple-400 text-purple-200">
                                  {scene.type}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="customize" className="space-y-4">
                <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Anpassungen
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Color Schemes */}
                    <div>
                      <Label className="text-white mb-3 block">Farbschema</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(colorSchemes).map(([id, colors]) => (
                          <Button
                            key={id}
                            variant="outline"
                            className="h-12 border-purple-500/30 hover:bg-purple-600/20"
                            onClick={() => handleColorSchemeChange(id)}
                          >
                            <div className="flex gap-1">
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.primary }} />
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.secondary }} />
                              <div className="w-4 h-4 rounded" style={{ backgroundColor: colors.accent }} />
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    <Separator className="bg-purple-500/30" />

                    {/* Text Customization */}
                    <div className="space-y-4">
                      <Label className="text-white">Text Anpassungen</Label>
                      
                      <div>
                        <Label className="text-purple-200 text-sm">Schriftgröße</Label>
                        <Select value={customization.fontSize} onValueChange={(value) => handleCustomizationChange('fontSize', value)}>
                          <SelectTrigger className="bg-black/20 border-purple-500/30 text-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Klein</SelectItem>
                            <SelectItem value="medium">Mittel</SelectItem>
                            <SelectItem value="large">Groß</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label className="text-purple-200 text-sm">Animationsgeschwindigkeit</Label>
                        <Slider
                          value={[customization.animationSpeed]}
                          onValueChange={(value) => handleCustomizationChange('animationSpeed', value[0])}
                          max={3}
                          min={0.5}
                          step={0.1}
                          className="mt-2"
                        />
                        <div className="text-purple-200 text-xs mt-1">{customization.animationSpeed}x</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="interactive" className="space-y-4">
                <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Interaktive Elemente
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      Füge Engagement-Elemente für maximale Reichweite hinzu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {interactiveElements.map((element) => (
                        <Card key={element.type} className="bg-black/10 border-purple-500/20">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-3 mb-2">
                              {element.icon}
                              <h3 className="text-white font-semibold">{element.name}</h3>
                            </div>
                            <p className="text-purple-200 text-sm mb-3">{element.description}</p>
                            <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                              Hinzufügen
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="export" className="space-y-4">
                <Card className="bg-black/20 border-purple-500/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Export & Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button className="bg-green-600 hover:bg-green-700 text-white">
                        <Download className="w-4 h-4 mr-2" />
                        MP4 Exportieren
                      </Button>
                      <Button variant="outline" className="border-purple-500/30 text-white hover:bg-purple-600/20">
                        <Share2 className="w-4 h-4 mr-2" />
                        Code Kopieren
                      </Button>
                    </div>
                    
                    <div>
                      <Label className="text-white mb-2 block">Generierter Code</Label>
                      <Textarea
                        value={generateCode()}
                        readOnly
                        className="bg-black/30 border-purple-500/30 text-green-400 font-mono text-xs h-64"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

